import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Check, X, AlertCircle, Eye, EyeOff, LayoutTemplate, ArrowRight, ExternalLink } from 'lucide-react';
import { useStoreData } from '../../context/StoreDataContext';
import { BannerItem } from '../../types';
import { ImageUploadArea } from './ImageUploadArea';

export const AdminBanners: React.FC = () => {
  const { banners, addBanner, modifyBanner, removeBanner } = useStoreData();
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  // Form Fields strictly matching user request: título, subtítulo, imagem, botão, link
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [kicker, setKicker] = useState('Collection Automne-Hiver · Boutique Saint-Germain');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [buttonText, setButtonText] = useState('Descobrir coleção');
  const [link, setLink] = useState('catalog');
  const [active, setActive] = useState(true);
  const [order, setOrder] = useState<number>(1);

  // Delete Confirm
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const showFeedback = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleOpenCreate = () => {
    setIsEditing(false);
    setCurrentId(null);
    setTitle('PARIS, 1986.');
    setSubtitle('“L\'élégance ne vieillit jamais.”');
    setKicker('Collection Automne-Hiver · Boutique Saint-Germain');
    setDescription('Inspirada no estilo French Preppy e na intelectualidade de Saint-Germain-des-Prés.');
    setImage('/src/assets/images/hero_paris_1986_editorial_1790164814011.jpg');
    setButtonText('Descobrir coleção');
    setLink('catalog');
    setActive(true);
    setOrder(banners.length + 1);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (b: BannerItem) => {
    setIsEditing(true);
    setCurrentId(b.id);
    setTitle(b.title);
    setSubtitle(b.subtitle);
    setKicker(b.kicker || 'Collection Automne-Hiver · Boutique Saint-Germain');
    setDescription(b.description || '');
    setImage(b.image);
    setButtonText(b.buttonText);
    setLink(b.link);
    setActive(b.active);
    setOrder(b.order || 1);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showFeedback('error', 'O título do banner é obrigatório.');
      return;
    }
    if (!image.trim()) {
      showFeedback('error', 'A imagem do banner é obrigatória.');
      return;
    }
    if (!buttonText.trim()) {
      showFeedback('error', 'O texto do botão é obrigatório.');
      return;
    }

    try {
      if (isEditing && currentId) {
        await modifyBanner(currentId, {
          title,
          subtitle,
          kicker,
          description,
          image,
          buttonText,
          link,
          active,
          order: Number(order)
        });
        showFeedback('success', `Banner "${title}" atualizado com sucesso!`);
      } else {
        const id = `ban_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
        await addBanner({
          id,
          title,
          subtitle,
          kicker,
          description,
          image,
          buttonText,
          link,
          active,
          order: Number(order)
        });
        showFeedback('success', `Novo banner "${title}" cadastrado com sucesso!`);
      }
      setIsModalOpen(false);
    } catch (err: any) {
      showFeedback('error', err.message || 'Erro ao salvar banner.');
    }
  };

  const handleToggleActive = async (b: BannerItem) => {
    try {
      await modifyBanner(b.id, { active: !b.active });
      showFeedback('success', `Status do banner "${b.title}" atualizado.`);
    } catch (err: any) {
      showFeedback('error', err.message);
    }
  };

  const handleDelete = async (bannerId: string) => {
    try {
      await removeBanner(bannerId);
      setDeleteConfirmId(null);
      showFeedback('success', 'Banner excluído com sucesso.');
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
            Gerenciamento de Banners da Página Inicial
          </h2>
          <p className="text-xs text-[#5D574F] mt-0.5">
            Configure títulos, subtítulos, imagens em alta resolução, textos de botões e links de destino da vitrine.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-5 py-2.5 bg-[#6B1D2F] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#83263B] transition-colors cursor-pointer flex items-center gap-2 shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Banner</span>
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

      {/* Banners List & Visual Preview Cards */}
      <div className="space-y-6">
        {banners.map((b, index) => {
          return (
            <div 
              key={b.id}
              className="bg-white border border-[#E8E1D5] overflow-hidden group hover:border-[#6B1D2F] transition-all flex flex-col lg:flex-row"
            >
              {/* Banner Visual Preview */}
              <div className="relative lg:w-1/2 min-h-[220px] bg-[#181716] overflow-hidden flex items-center p-6 text-white">
                <img
                  src={b.image}
                  alt={b.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/30" />
                <div className="absolute inset-0 bg-[#6B1D2F]/15 mix-blend-color" />

                <div className="relative z-10 space-y-2 max-w-md">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#E8E1D5] block">
                    {b.kicker || 'Collection Automne-Hiver · Boutique Saint-Germain'}
                  </span>
                  <h3 className="font-serif text-3xl font-medium tracking-tight text-white leading-tight">
                    {b.title}
                  </h3>
                  {b.subtitle && (
                    <p className="font-serif italic text-[#E5DCD0] text-sm">
                      {b.subtitle}
                    </p>
                  )}
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FAF8F5] text-[#181716] text-[10px] font-semibold uppercase tracking-wider">
                      <span>{b.buttonText}</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                <div className="absolute top-3 right-3 z-10">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${
                    b.active ? 'bg-[#2A6E3F] text-white' : 'bg-[#181716]/80 text-white/70'
                  }`}>
                    {b.active ? 'Ativo na Home' : 'Inativo'}
                  </span>
                </div>
              </div>

              {/* Banner Details & Action Controls */}
              <div className="p-6 lg:w-1/2 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#6B1D2F]">
                      Posição #{b.order || (index + 1)}
                    </span>
                    <span className="text-[11px] text-[#7A7367]">
                      Link de destino: <code className="bg-[#FAF8F5] px-1.5 py-0.5 border border-[#E8E1D5] text-[#181716] font-mono">/{b.link}</code>
                    </span>
                  </div>

                  <div className="text-xs text-[#5D574F] space-y-1">
                    <p><strong className="text-[#181716]">Título:</strong> {b.title}</p>
                    <p><strong className="text-[#181716]">Subtítulo:</strong> {b.subtitle}</p>
                    <p><strong className="text-[#181716]">Botão:</strong> {b.buttonText}</p>
                    {b.description && (
                      <p><strong className="text-[#181716]">Descrição:</strong> {b.description}</p>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#F2ECE1] flex items-center justify-between">
                  <button
                    onClick={() => handleToggleActive(b)}
                    className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer border ${
                      b.active 
                        ? 'bg-[#FAF8F5] text-[#5D574F] border-[#E8E1D5] hover:border-[#181716]' 
                        : 'bg-[#2A6E3F] text-white border-[#2A6E3F]'
                    }`}
                  >
                    {b.active ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{b.active ? 'Ocultar da Home' : 'Ativar na Home'}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(b)}
                      className="px-3 py-1.5 bg-[#FAF8F5] border border-[#E8E1D5] text-[#181716] text-xs font-semibold hover:border-[#6B1D2F] hover:text-[#6B1D2F] transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Editar</span>
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(b.id)}
                      className="p-1.5 text-[#C43828] hover:bg-[#FDF0EE] transition-colors cursor-pointer border border-transparent hover:border-[#F5C2BC]"
                      title="Excluir Banner"
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

      {/* Modal: Create / Edit Banner */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E8E1D5] max-w-xl w-full p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#E8E1D5] pb-3">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#6B1D2F] font-semibold">
                  Maison KVANORI · Hero Vitrine
                </span>
                <h3 className="text-lg font-serif text-[#181716]">
                  {isEditing ? 'Editar Banner da Página Inicial' : 'Criar Novo Banner'}
                </h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-[#7A7367] hover:text-[#181716] cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              
              {/* Título */}
              <div>
                <label className="text-xs font-semibold text-[#181716] block mb-1">
                  Título Principal *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: PARIS, 1986."
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D5] text-xs font-serif font-bold text-[#181716] focus:outline-none focus:border-[#6B1D2F]"
                />
              </div>

              {/* Subtítulo */}
              <div>
                <label className="text-xs font-semibold text-[#181716] block mb-1">
                  Subtítulo / Citação
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Ex: “L'élégance ne vieillit jamais.”"
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D5] text-xs font-serif italic text-[#181716] focus:outline-none focus:border-[#6B1D2F]"
                />
              </div>

              {/* Kicker & Ordem */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-[#181716] block mb-1">
                    Tagline Superior (Kicker)
                  </label>
                  <input
                    type="text"
                    value={kicker}
                    onChange={(e) => setKicker(e.target.value)}
                    placeholder="Ex: Collection Automne-Hiver · Boutique Saint-Germain"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D5] text-xs text-[#181716] focus:outline-none focus:border-[#6B1D2F]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#181716] block mb-1">
                    Ordem de Exibição
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D5] text-xs font-mono font-bold text-[#181716] focus:outline-none focus:border-[#6B1D2F]"
                  />
                </div>
              </div>

              {/* Imagem com suporte a upload direto */}
              <div>
                <ImageUploadArea
                  images={image ? [image] : []}
                  onChange={(imgs) => setImage(imgs[0] || '')}
                  maxImages={1}
                  label="Imagem de Fundo do Banner (Upload ou Link)"
                  allowUrlFallback={true}
                />
              </div>

              {/* Botão e Link */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#181716] block mb-1">
                    Texto do Botão *
                  </label>
                  <input
                    type="text"
                    required
                    value={buttonText}
                    onChange={(e) => setButtonText(e.target.value)}
                    placeholder="Ex: Descobrir coleção, Ver Lookbook"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D5] text-xs uppercase tracking-wider font-semibold text-[#181716] focus:outline-none focus:border-[#6B1D2F]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#181716] block mb-1">
                    Link de Destino *
                  </label>
                  <select
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D5] text-xs text-[#181716] focus:outline-none focus:border-[#6B1D2F] cursor-pointer"
                  >
                    <option value="catalog">Catálogo Completo (/catalog)</option>
                    <option value="looks">Silhuetas & Looks (/looks)</option>
                    <option value="carnet">Carnet Editorial (/carnet)</option>
                    <option value="sobre">A Maison KVANORI (/sobre)</option>
                  </select>
                </div>
              </div>

              {/* Descrição Editorial */}
              <div>
                <label className="text-xs font-semibold text-[#181716] block mb-1">
                  Texto Descritivo
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Texto corrido exibido abaixo do subtítulo na vitrine..."
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D5] text-xs text-[#181716] focus:outline-none focus:border-[#6B1D2F]"
                />
              </div>

              {/* Ativo */}
              <label className="flex items-center gap-2.5 p-3 bg-[#FAF8F5] border border-[#E8E1D5] cursor-pointer">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  className="w-4 h-4 text-[#2A6E3F] focus:ring-0 rounded"
                />
                <div>
                  <span className="text-xs font-semibold text-[#181716] block">
                    Banner Ativo na Página Inicial
                  </span>
                  <span className="text-[10px] text-[#7A7367]">
                    Visível no carrossel de entrada da loja
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
                  {isEditing ? 'Salvar Banner' : 'Publicar Banner'}
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
                Excluir Banner
              </h4>
              <p className="text-xs text-[#5D574F] mt-1">
                Deseja realmente remover este banner da vitrine inicial?
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
