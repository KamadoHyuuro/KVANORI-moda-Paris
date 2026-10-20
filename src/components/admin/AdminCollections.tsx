import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Check, X, AlertCircle, Compass, Eye, EyeOff } from 'lucide-react';
import { useStoreData } from '../../context/StoreDataContext';
import { CollectionItem } from '../../types';
import { ImageUploadArea } from './ImageUploadArea';

export const AdminCollections: React.FC = () => {
  const { collections, products, addCollection, modifyCollection, removeCollection } = useStoreData();
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [season, setSeason] = useState('Automne-Hiver 1986');
  const [active, setActive] = useState(true);

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
    setDescription('');
    setImage('/src/assets/images/hero_paris_1986_editorial_1790164814011.jpg');
    setSeason('Automne-Hiver 1986');
    setActive(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (col: CollectionItem) => {
    setIsEditing(true);
    setCurrentId(col.id);
    setName(col.name);
    setDescription(col.description);
    setImage(col.image);
    setSeason(col.season || 'Automne-Hiver 1986');
    setActive(col.active);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showFeedback('error', 'O nome da coleção é obrigatório.');
      return;
    }
    const finalImage = image.trim() || '/src/assets/images/hero_paris_1986_editorial_1790164814011.jpg';

    try {
      if (isEditing && currentId) {
        await modifyCollection(currentId, {
          name,
          description,
          image: finalImage,
          season,
          active
        });
        showFeedback('success', `Coleção "${name}" atualizada com sucesso!`);
      } else {
        const id = `col_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
        await addCollection({
          id,
          name,
          description,
          image: finalImage,
          season,
          active
        });
        showFeedback('success', `Coleção "${name}" cadastrada com sucesso!`);
      }
      setIsModalOpen(false);
    } catch (err: any) {
      showFeedback('error', err.message || 'Erro ao salvar coleção.');
    }
  };

  const handleToggleActive = async (col: CollectionItem) => {
    try {
      await modifyCollection(col.id, { active: !col.active });
      showFeedback('success', `Status da coleção ${col.name} alternado.`);
    } catch (err: any) {
      showFeedback('error', err.message);
    }
  };

  const handleDelete = async (colId: string) => {
    try {
      await removeCollection(colId);
      setDeleteConfirmId(null);
      showFeedback('success', 'Coleção removida com sucesso.');
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
            Gerenciamento de Coleções Editoriais
          </h2>
          <p className="text-xs text-[#5D574F] mt-0.5">
            Crie narrativas sazonais, lookbooks temáticos e cápsulas com estética parisiense.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-5 py-2.5 bg-[#6B1D2F] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#83263B] transition-colors cursor-pointer flex items-center gap-2 shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Nova Coleção</span>
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

      {/* Grid of Collections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collections.map((col) => {
          const prodsCount = products.filter(p => p.collection === col.name).length;

          return (
            <div 
              key={col.id}
              className="bg-white border border-[#E8E1D5] overflow-hidden flex flex-col group hover:border-[#6B1D2F] transition-all"
            >
              <div className="relative h-56 overflow-hidden bg-[#FAF8F5]">
                <img
                  src={col.image}
                  alt={col.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                <div className="absolute top-4 right-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                    col.active ? 'bg-[#2A6E3F] text-white' : 'bg-[#181716]/80 text-[#D5CCC0]'
                  }`}>
                    {col.active ? 'Ativa' : 'Inativa'}
                  </span>
                </div>

                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#E8E1D5] block">
                    {col.season || 'Édition 1986'}
                  </span>
                  <h3 className="font-serif text-2xl text-white font-medium">
                    {col.name}
                  </h3>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-[#5D574F] leading-relaxed">
                  {col.description}
                </p>

                <div className="pt-3 border-t border-[#F2ECE1] flex items-center justify-between text-xs">
                  <span className="font-mono text-[#6B1D2F] font-semibold">
                    {prodsCount} peças nesta coleção
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleActive(col)}
                      className="p-1.5 text-[#5D574F] hover:text-[#181716] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                      title={col.active ? 'Desativar Coleção' : 'Ativar Coleção'}
                    >
                      {col.active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleOpenEdit(col)}
                      className="p-1.5 text-[#5D574F] hover:text-[#181716] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                      title="Editar Coleção"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(col.id)}
                      className="p-1.5 text-[#C43828] hover:text-[#8A2418] hover:bg-[#FDF0EE] transition-colors cursor-pointer"
                      title="Excluir Coleção"
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

      {/* Modal: Create / Edit Collection */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E8E1D5] max-w-lg w-full p-6 space-y-5 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#E8E1D5] pb-3">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#6B1D2F] font-semibold">
                  Maison KVANORI · Silhuetas
                </span>
                <h3 className="text-lg font-serif text-[#181716]">
                  {isEditing ? 'Editar Coleção' : 'Nova Coleção Temática'}
                </h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-[#7A7367] hover:text-[#181716] cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#181716] block mb-1">
                  Nome da Coleção *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Automne-Hiver 1986, Café de Flore Spring"
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D5] text-xs text-[#181716] focus:outline-none focus:border-[#6B1D2F]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#181716] block mb-1">
                  Temporada / Ano
                </label>
                <input
                  type="text"
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                  placeholder="Ex: Automne-Hiver 1986"
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D5] text-xs text-[#181716] focus:outline-none focus:border-[#6B1D2F]"
                />
              </div>

              {/* Imagem de Capa com Upload */}
              <div>
                <ImageUploadArea
                  images={image ? [image] : []}
                  onChange={(imgs) => setImage(imgs[0] || '')}
                  maxImages={1}
                  label="Imagem de Capa da Coleção (Upload ou Link)"
                  allowUrlFallback={true}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#181716] block mb-1">
                  Manifesto & Descrição Editorial
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="A atmosfera, tecidos e inspiração da coleção..."
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D5] text-xs text-[#181716] focus:outline-none focus:border-[#6B1D2F]"
                />
              </div>

              <label className="flex items-center gap-2.5 p-3 bg-[#FAF8F5] border border-[#E8E1D5] cursor-pointer">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  className="w-4 h-4 text-[#2A6E3F] focus:ring-0 rounded"
                />
                <div>
                  <span className="text-xs font-semibold text-[#181716] block">
                    Coleção Ativa
                  </span>
                  <span className="text-[10px] text-[#7A7367]">
                    Disponível nos filtros e lookbooks
                  </span>
                </div>
              </label>

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
                  {isEditing ? 'Salvar Coleção' : 'Criar Coleção'}
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
                Excluir Coleção
              </h4>
              <p className="text-xs text-[#5D574F] mt-1">
                Deseja realmente remover esta coleção do acervo?
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
