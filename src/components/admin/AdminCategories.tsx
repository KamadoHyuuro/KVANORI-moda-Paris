import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Check, X, AlertCircle, Layers, Image as ImageIcon } from 'lucide-react';
import { useStoreData } from '../../context/StoreDataContext';
import { CategoryItem } from '../../types';
import { ImageUploadArea } from './ImageUploadArea';

export const AdminCategories: React.FC = () => {
  const { categories, products, addCategory, modifyCategory, removeCategory } = useStoreData();
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  // Delete Confirm
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const showFeedback = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleOpenCreate = () => {
    setIsEditing(false);
    setCurrentId(null);
    setName('');
    setSlug('');
    setImage('https://images.unsplash.com/photo-1548624149-f9b1859aa7d0?auto=format&fit=crop&w=600&q=80');
    setDescription('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c: CategoryItem) => {
    setIsEditing(true);
    setCurrentId(c.id);
    setName(c.name);
    setSlug(c.slug);
    setImage(c.image);
    setDescription(c.description || '');
    setIsModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!isEditing) {
      setSlug(val.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '-'));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showFeedback('error', 'O nome da categoria é obrigatório.');
      return;
    }
    const finalSlug = slug.trim() || name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const finalImage = image.trim() || 'https://images.unsplash.com/photo-1548624149-f9b1859aa7d0?auto=format&fit=crop&w=600&q=80';

    try {
      if (isEditing && currentId) {
        await modifyCategory(currentId, {
          name,
          slug: finalSlug,
          image: finalImage,
          description
        });
        showFeedback('success', `Categoria "${name}" atualizada com sucesso!`);
      } else {
        const id = `cat_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
        await addCategory({
          id,
          name,
          slug: finalSlug,
          image: finalImage,
          description,
          count: 0
        });
        showFeedback('success', `Nova categoria "${name}" cadastrada com sucesso!`);
      }
      setIsModalOpen(false);
    } catch (err: any) {
      showFeedback('error', err.message || 'Erro ao salvar categoria.');
    }
  };

  const handleDelete = async (catId: string) => {
    const productsInCat = products.filter(p => p.category === categories.find(c => c.id === catId)?.name);
    if (productsInCat.length > 0) {
      showFeedback('error', `Não é possível excluir: existem ${productsInCat.length} produto(s) associados a esta categoria.`);
      setDeleteConfirmId(null);
      return;
    }

    try {
      await removeCategory(catId);
      setDeleteConfirmId(null);
      showFeedback('success', 'Categoria excluída com sucesso.');
    } catch (err: any) {
      showFeedback('error', err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#E8E1D5] p-5">
        <div>
          <h2 className="text-xl font-serif text-[#181716]">
            Gerenciamento de Categorias
          </h2>
          <p className="text-xs text-[#5D574F] mt-0.5">
            Organize os departamentos e taxonomias de peças do acervo KVANORI.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-5 py-2.5 bg-[#6B1D2F] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#83263B] transition-colors cursor-pointer flex items-center gap-2 shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Nova Categoria</span>
        </button>
      </div>

      {/* Feedback Toast */}
      {feedback && (
        <div className={`p-4 text-xs flex items-center justify-between transition-all ${
          feedback.type === 'success' 
            ? 'bg-[#EBF7EE] text-[#2A6E3F] border border-[#C4E7CC]' 
            : 'bg-[#FDF0EE] text-[#C43828] border border-[#F5C2BC]'
        }`}>
          <div className="flex items-center gap-2 font-medium">
            {feedback.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{feedback.message}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="cursor-pointer hover:opacity-75">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((c) => {
          const prodsCount = products.filter(p => p.category === c.name).length;

          return (
            <div 
              key={c.id} 
              className="bg-white border border-[#E8E1D5] overflow-hidden flex flex-col group hover:border-[#6B1D2F] transition-all"
            >
              <div className="relative h-44 overflow-hidden bg-[#FAF8F5]">
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-white/80 block">
                    Slug: {c.slug}
                  </span>
                  <h3 className="font-serif text-lg text-white font-medium">
                    {c.name}
                  </h3>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-[#5D574F] line-clamp-2">
                  {c.description || 'Categoria de alfaiataria e silhuetas femininas com corte impecável.'}
                </p>

                <div className="pt-3 border-t border-[#F2ECE1] flex items-center justify-between text-xs">
                  <span className="font-mono text-[#6B1D2F] font-semibold">
                    {prodsCount} produtos vinculados
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(c)}
                      className="p-1.5 text-[#5D574F] hover:text-[#181716] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                      title="Editar Categoria"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(c.id)}
                      className="p-1.5 text-[#C43828] hover:text-[#8A2418] hover:bg-[#FDF0EE] transition-colors cursor-pointer"
                      title="Excluir Categoria"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Create / Edit Category */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E8E1D5] max-w-md w-full p-6 space-y-5 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#E8E1D5] pb-3">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#6B1D2F] font-semibold">
                  Maison KVANORI
                </span>
                <h3 className="text-lg font-serif text-[#181716]">
                  {isEditing ? 'Editar Categoria' : 'Criar Nova Categoria'}
                </h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-[#7A7367] hover:text-[#181716] cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#181716] block mb-1">
                  Nome da Categoria *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Ex: Blazers, Trench-coats, Saias"
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D5] text-xs text-[#181716] focus:outline-none focus:border-[#6B1D2F]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#181716] block mb-1">
                  Slug (URL)
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="Ex: blazers, trench-coats"
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D5] text-xs font-mono text-[#181716] focus:outline-none focus:border-[#6B1D2F]"
                />
              </div>

              {/* Imagem de Capa com Upload */}
              <div>
                <ImageUploadArea
                  images={image ? [image] : []}
                  onChange={(imgs) => setImage(imgs[0] || '')}
                  maxImages={1}
                  label="Imagem de Capa da Categoria (Upload ou Link)"
                  allowUrlFallback={true}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#181716] block mb-1">
                  Descrição Editorial
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Texto conciso explicando a categoria para a cliente..."
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D5] text-xs text-[#181716] focus:outline-none focus:border-[#6B1D2F]"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#E8E1D5]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-[#D5CCC0] text-xs uppercase tracking-wider text-[#5D574F] hover:bg-[#FAF8F5] font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#6B1D2F] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#83263B] transition-colors cursor-pointer shadow-sm"
                >
                  {isEditing ? 'Salvar Alterações' : 'Criar Categoria'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E8E1D5] max-w-sm w-full p-6 text-center space-y-4 shadow-xl animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-[#FDF0EE] text-[#C43828] mx-auto flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-serif text-[#181716]">
                Excluir Categoria
              </h4>
              <p className="text-xs text-[#5D574F] mt-1">
                Deseja realmente remover esta categoria? Certifique-se de que não haja produtos associados.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="w-1/2 py-2 border border-[#D5CCC0] text-xs uppercase tracking-wider text-[#181716] hover:bg-[#FAF8F5] font-semibold cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="w-1/2 py-2 bg-[#C43828] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#A82819] transition-colors cursor-pointer"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
