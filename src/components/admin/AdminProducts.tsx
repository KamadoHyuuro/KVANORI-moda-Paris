import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  Star, 
  Sparkles, 
  Eye, 
  EyeOff, 
  DollarSign, 
  Package, 
  Image as ImageIcon,
  Palette,
  CheckSquare,
  AlertCircle
} from 'lucide-react';
import { useStoreData } from '../../context/StoreDataContext';
import { Product, ProductColor } from '../../types';
import { ImageUploadArea } from './ImageUploadArea';

export const AdminProducts: React.FC = () => {
  const { 
    products, 
    categories, 
    collections, 
    addProduct, 
    updateProduct, 
    deleteProduct 
  } = useStoreData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('Todas');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Quick Inline Edit for Price & Stock
  const [inlineEditingId, setInlineEditingId] = useState<string | null>(null);
  const [inlinePrice, setInlinePrice] = useState<number>(0);
  const [inlineStock, setInlineStock] = useState<number>(0);

  // Modal State (Create or Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [frenchSubtitle, setFrenchSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Blazers');
  const [collection, setCollection] = useState('Automne-Hiver 1986');
  const [price, setPrice] = useState<number>(1280);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(undefined);
  const [stock, setStock] = useState<number>(10);
  const [active, setActive] = useState<boolean>(true);
  const [featured, setFeatured] = useState<boolean>(false);
  const [newArrival, setNewArrival] = useState<boolean>(true);
  const [composition, setComposition] = useState('100% Lã Virgem');
  const [care, setCare] = useState('Lavagem a seco especializada');

  // Dynamic Sizes Management
  const [sizes, setSizes] = useState<string[]>(['36', '38', '40', '42']);
  const [customSizeInput, setCustomSizeInput] = useState('');

  // Dynamic Colors Management
  const [colors, setColors] = useState<ProductColor[]>([
    { name: 'Marine Français', hex: '#1C2841' },
    { name: 'Crème Saint-Germain', hex: '#F4EFE6' }
  ]);
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#6B1D2F');

  // Dynamic Images Management
  const [images, setImages] = useState<string[]>([]);

  // Delete Confirmation Modal
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const showFeedback = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  // Open modal for NEW product
  const handleOpenCreateModal = () => {
    setIsEditing(false);
    setCurrentId(null);
    setName('');
    setFrenchSubtitle('');
    setDescription('');
    setCategory(categories[0]?.name || 'Blazers');
    setCollection(collections[0]?.name || 'Automne-Hiver 1986');
    setPrice(980);
    setOriginalPrice(undefined);
    setStock(12);
    setActive(true);
    setFeatured(false);
    setNewArrival(true);
    setComposition('100% Lã e fios nobres');
    setCare('Lavagem a seco profissional');
    setSizes(['36', '38', '40', '42']);
    setColors([
      { name: 'Marine Étoile', hex: '#1C2841' },
      { name: 'Bordeaux Ateliê', hex: '#6B1D2F' }
    ]);
    setImages([]);
    setIsModalOpen(true);
  };

  // Open modal for EDIT product
  const handleOpenEditModal = (p: Product) => {
    setIsEditing(true);
    setCurrentId(p.id);
    setName(p.name);
    setFrenchSubtitle(p.frenchSubtitle || '');
    setDescription(p.description);
    setCategory(p.category);
    setCollection(p.collection || collections[0]?.name || 'Automne-Hiver 1986');
    setPrice(p.price);
    setOriginalPrice(p.originalPrice);
    setStock(p.stock ?? 10);
    setActive(p.active !== false);
    setFeatured(!!p.featured || !!p.isBestseller);
    setNewArrival(!!p.newArrival || !!p.isNew);
    setComposition(p.composition || 'Tweed / Algodão egípcio');
    setCare(p.care || 'Lavagem especializada');
    setSizes(p.sizes && p.sizes.length > 0 ? [...p.sizes] : ['36', '38', '40']);
    setColors(p.colors && p.colors.length > 0 ? [...p.colors] : [{ name: 'Noir', hex: '#181716' }]);
    setImages(p.images && p.images.length > 0 ? [...p.images] : []);
    setIsModalOpen(true);
  };

  // Save Modal Form
  const handleSaveProductForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showFeedback('error', 'O nome do produto é obrigatório.');
      return;
    }
    if (price <= 0) {
      showFeedback('error', 'O preço deve ser superior a zero.');
      return;
    }
    // Garante ao menos uma imagem com elegante placeholder oficial KVANORI se nenhuma foto foi anexada
    const finalImages = images.length > 0 ? images : ['/placeholder-kvanori.svg'];

    try {
      if (isEditing && currentId) {
        await updateProduct(currentId, {
          name: name.trim(),
          frenchSubtitle: frenchSubtitle.trim(),
          description: description.trim(),
          category,
          collection,
          price: Number(price),
          originalPrice: originalPrice ? Number(originalPrice) : undefined,
          stock: Number(stock),
          active,
          featured,
          newArrival,
          isBestseller: featured,
          isNew: newArrival,
          sizes,
          colors,
          images: finalImages,
          composition,
          care
        });
        showFeedback('success', `Peça "${name}" atualizada com sucesso!`);
      } else {
        const safeSlug = name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]/g, '_')
          .replace(/_+/g, '_')
          .slice(0, 24);
        const id = `rg_${safeSlug || 'peca'}_${Date.now().toString().slice(-6)}`;

        const newProduct: Product = {
          id,
          name: name.trim(),
          slug: id,
          frenchSubtitle: frenchSubtitle.trim(),
          description: description.trim() || `Peça exclusiva do ateliê KVANORI, confeccionada com precisão alfaiate.`,
          category,
          collection,
          price: Number(price),
          originalPrice: originalPrice ? Number(originalPrice) : undefined,
          stock: Number(stock),
          active,
          featured,
          newArrival,
          isBestseller: featured,
          isNew: newArrival,
          sizes,
          colors,
          images: finalImages,
          composition,
          care,
          createdAt: new Date().toISOString()
        };
        await addProduct(newProduct);
        showFeedback('success', `Nova peça "${name}" cadastrada com sucesso no acervo!`);
      }
      setIsModalOpen(false);
    } catch (err: any) {
      let displayError = err?.message || 'Erro ao salvar produto.';
      try {
        const parsed = JSON.parse(displayError);
        if (parsed?.error) displayError = parsed.error;
      } catch {}
      showFeedback('error', displayError);
    }
  };

  // Quick Inline Save
  const handleStartInlineEdit = (p: Product) => {
    setInlineEditingId(p.id);
    setInlinePrice(p.price);
    setInlineStock(p.stock ?? 10);
  };

  const handleSaveInlineEdit = async (productId: string) => {
    try {
      await updateProduct(productId, {
        price: Number(inlinePrice),
        stock: Number(inlineStock)
      });
      setInlineEditingId(null);
      showFeedback('success', 'Preço e estoque atualizados com sucesso.');
    } catch (err: any) {
      showFeedback('error', err.message || 'Erro ao atualizar.');
    }
  };

  // Quick Toggle Flags
  const handleToggleActive = async (p: Product) => {
    const nextState = p.active === false ? true : false;
    try {
      await updateProduct(p.id, { active: nextState });
      showFeedback('success', `Produto ${nextState ? 'ativado' : 'desativado'} com sucesso.`);
    } catch (err: any) {
      showFeedback('error', err.message);
    }
  };

  const handleToggleFeatured = async (p: Product) => {
    const next = !p.featured;
    try {
      await updateProduct(p.id, { featured: next, isBestseller: next });
      showFeedback('success', `Destaque ${next ? 'ativado' : 'removido'}.`);
    } catch (err: any) {
      showFeedback('error', err.message);
    }
  };

  const handleToggleNewArrival = async (p: Product) => {
    const next = !p.newArrival;
    try {
      await updateProduct(p.id, { newArrival: next, isNew: next });
      showFeedback('success', `Novidade ${next ? 'marcada' : 'desmarcada'}.`);
    } catch (err: any) {
      showFeedback('error', err.message);
    }
  };

  // Delete Action
  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      setDeleteConfirmId(null);
      showFeedback('success', 'Produto excluído permanentemente com sucesso.');
    } catch (err: any) {
      showFeedback('error', err.message);
    }
  };

  // Size chips helper
  const handleToggleSize = (sizeOption: string) => {
    if (sizes.includes(sizeOption)) {
      setSizes(sizes.filter(s => s !== sizeOption));
    } else {
      setSizes([...sizes, sizeOption]);
    }
  };

  const handleAddCustomSize = () => {
    if (customSizeInput.trim() && !sizes.includes(customSizeInput.trim().toUpperCase())) {
      setSizes([...sizes, customSizeInput.trim().toUpperCase()]);
      setCustomSizeInput('');
    }
  };

  // Color helper
  const handleAddColor = () => {
    if (newColorName.trim()) {
      setColors([...colors, { name: newColorName.trim(), hex: newColorHex }]);
      setNewColorName('');
    }
  };

  const handleRemoveColor = (index: number) => {
    setColors(colors.filter((_, idx) => idx !== index));
  };

  // Filtered Products
  const filteredProducts = products.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.frenchSubtitle && p.frenchSubtitle.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = 
      selectedCategoryFilter === 'Todas' || 
      p.category === selectedCategoryFilter;

    return matchesSearch && matchesCategory;
  });

  const formatBRL = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & New Product CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#E8E1D5] p-5">
        <div>
          <h2 className="text-xl font-serif text-[#181716]">
            Gerenciamento de Produtos
          </h2>
          <p className="text-xs text-[#5D574F] mt-0.5">
            Cadastre peças, ajuste preços, controle estoque e configure destaques editoriais.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="px-5 py-2.5 bg-[#6B1D2F] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#83263B] transition-colors cursor-pointer flex items-center gap-2 shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Criar Novo Produto</span>
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

      {/* Search and Filters Bar */}
      <div className="bg-white border border-[#E8E1D5] p-4 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C8476]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nome, subtítulo ou categoria..."
            className="w-full pl-9 pr-3 py-2 bg-[#FAF8F5] border border-[#E8E1D5] text-xs text-[#181716] focus:outline-none focus:border-[#6B1D2F]"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <label className="text-xs text-[#5D574F] whitespace-nowrap">Filtrar Categoria:</label>
          <select
            value={selectedCategoryFilter}
            onChange={(e) => setSelectedCategoryFilter(e.target.value)}
            className="py-2 px-3 bg-[#FAF8F5] border border-[#E8E1D5] text-xs text-[#181716] focus:outline-none focus:border-[#6B1D2F] cursor-pointer"
          >
            <option value="Todas">Todas as categorias</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
          <span className="text-xs text-[#8C8476] font-mono">
            {filteredProducts.length} de {products.length} itens
          </span>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-[#E8E1D5] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#E8E1D5] text-[#7A7367] uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4 font-semibold">Peça / Imagem</th>
                <th className="py-3 px-4 font-semibold">Categoria & Coleção</th>
                <th className="py-3 px-4 font-semibold">Preço (R$)</th>
                <th className="py-3 px-4 font-semibold">Estoque</th>
                <th className="py-3 px-4 font-semibold text-center">Status</th>
                <th className="py-3 px-4 font-semibold text-center">Destaque</th>
                <th className="py-3 px-4 font-semibold text-center">Novidade</th>
                <th className="py-3 px-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2ECE1]">
              {filteredProducts.map((p) => {
                const isInline = inlineEditingId === p.id;
                const isLowStock = (p.stock ?? 10) <= 3;
                const isActive = p.active !== false;

                return (
                  <tr key={p.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                    {/* Item & Image */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images?.[0] || 'https://images.unsplash.com/photo-1548624149-f9b1859aa7d0?auto=format&fit=crop&w=150&q=80'}
                          alt={p.name}
                          className="w-11 h-14 object-cover border border-[#E8E1D5] shrink-0 bg-[#FAF8F5]"
                        />
                        <div className="min-w-0 max-w-xs">
                          <span className="font-serif text-sm text-[#181716] block truncate font-medium">
                            {p.name}
                          </span>
                          {p.frenchSubtitle && (
                            <span className="text-[11px] font-serif italic text-[#8C8476] truncate block">
                              {p.frenchSubtitle}
                            </span>
                          )}
                          <span className="text-[10px] font-mono text-[#8C8476]">
                            ID: {p.id.slice(-8)}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category & Collection */}
                    <td className="py-3 px-4">
                      <span className="font-medium text-[#181716] block">
                        {p.category}
                      </span>
                      <span className="text-[10px] text-[#7A7367]">
                        {p.collection || 'Automne-Hiver 1986'}
                      </span>
                    </td>

                    {/* Price with Inline Edit */}
                    <td className="py-3 px-4">
                      {isInline ? (
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] text-[#8C8476]">R$</span>
                          <input
                            type="number"
                            value={inlinePrice}
                            onChange={(e) => setInlinePrice(Number(e.target.value))}
                            className="w-20 px-1.5 py-1 bg-white border border-[#6B1D2F] text-xs font-mono font-bold text-[#181716]"
                          />
                        </div>
                      ) : (
                        <button
                          onClick={() => handleStartInlineEdit(p)}
                          title="Clique para editar preço rapidamente"
                          className="font-medium text-[#181716] hover:text-[#6B1D2F] hover:underline cursor-pointer group flex items-center gap-1"
                        >
                          <span>{formatBRL(p.price)}</span>
                          <Edit3 className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      )}
                    </td>

                    {/* Stock with Inline Edit */}
                    <td className="py-3 px-4">
                      {isInline ? (
                        <input
                          type="number"
                          value={inlineStock}
                          onChange={(e) => setInlineStock(Number(e.target.value))}
                          className="w-14 px-1.5 py-1 bg-white border border-[#6B1D2F] text-xs font-mono font-bold text-[#181716]"
                        />
                      ) : (
                        <button
                          onClick={() => handleStartInlineEdit(p)}
                          title="Clique para editar estoque rapidamente"
                          className="hover:underline cursor-pointer group flex items-center gap-1.5"
                        >
                          <span className={`font-mono font-bold text-xs ${
                            isLowStock ? 'text-[#C43828] bg-[#FDF0EE] px-1.5 py-0.5' : 'text-[#2A6E3F]'
                          }`}>
                            {p.stock ?? 10} un.
                          </span>
                          <Edit3 className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#8C8476]" />
                        </button>
                      )}
                    </td>

                    {/* Status Active / Inactive */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleToggleActive(p)}
                        title={isActive ? 'Clique para desativar' : 'Clique para ativar'}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                          isActive ? 'bg-[#EBF7EE] text-[#2A6E3F] hover:bg-[#D5EFE0]' : 'bg-[#F2ECE1] text-[#8C8476] hover:bg-[#E5DDD0]'
                        }`}
                      >
                        {isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span>{isActive ? 'Ativo' : 'Inativo'}</span>
                      </button>
                    </td>

                    {/* Featured Star */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleToggleFeatured(p)}
                        title="Alternar destaque na página principal"
                        className={`p-1.5 rounded transition-colors cursor-pointer ${
                          p.featured || p.isBestseller
                            ? 'text-[#C2A97E] hover:text-[#A38656]' 
                            : 'text-[#D5CCC0] hover:text-[#8C8476]'
                        }`}
                      >
                        <Star className={`w-4 h-4 ${p.featured || p.isBestseller ? 'fill-[#C2A97E]' : ''}`} />
                      </button>
                    </td>

                    {/* New Arrival Sparkles */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleToggleNewArrival(p)}
                        title="Alternar marcação como Novidade"
                        className={`p-1.5 rounded transition-colors cursor-pointer ${
                          p.newArrival || p.isNew
                            ? 'text-[#6B1D2F] font-bold' 
                            : 'text-[#D5CCC0] hover:text-[#8C8476]'
                        }`}
                      >
                        <Sparkles className="w-4 h-4" />
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      {isInline ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleSaveInlineEdit(p.id)}
                            className="p-1 bg-[#2A6E3F] text-white hover:bg-[#235832] transition-colors cursor-pointer"
                            title="Salvar alterações de preço e estoque"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setInlineEditingId(null)}
                            className="p-1 bg-[#F2ECE1] text-[#181716] hover:bg-[#E8E1D5] transition-colors cursor-pointer"
                            title="Cancelar edição rápida"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditModal(p)}
                            className="p-1.5 text-[#5D574F] hover:text-[#181716] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                            title="Editar produto completo (tamanhos, cores, fotos)"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(p.id)}
                            className="p-1.5 text-[#C43828] hover:text-[#8A2418] hover:bg-[#FDF0EE] transition-colors cursor-pointer"
                            title="Excluir produto"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* FULL MODAL: CREATE / EDIT PRODUCT */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-[#E8E1D5] max-w-3xl w-full my-8 max-h-[90vh] flex flex-col shadow-2xl animate-fadeIn">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-[#E8E1D5] flex items-center justify-between bg-[#FAF8F5]">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#6B1D2F] font-semibold">
                  Atelier KVANORI · Acervo
                </span>
                <h3 className="text-xl font-serif text-[#181716] mt-0.5">
                  {isEditing ? `Editar: ${name}` : 'Cadastrar Nova Peça'}
                </h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-[#7A7367] hover:text-[#181716] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Scrollable Body */}
            <form onSubmit={handleSaveProductForm} className="p-6 space-y-6 overflow-y-auto flex-1">
              
              {/* Row 1: Name and French Subtitle */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#181716] block mb-1">
                    Nome da Peça *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Blazer em Tweed Saint-Germain"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D5] text-xs text-[#181716] focus:outline-none focus:border-[#6B1D2F]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#181716] block mb-1">
                    Subtítulo em Francês (Editorial)
                  </label>
                  <input
                    type="text"
                    value={frenchSubtitle}
                    onChange={(e) => setFrenchSubtitle(e.target.value)}
                    placeholder="Ex: Tailleur en Tweed de Laine Vierge"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D5] text-xs font-serif italic text-[#181716] focus:outline-none focus:border-[#6B1D2F]"
                  />
                </div>
              </div>

              {/* Row 2: Category, Collection, Price, Original Price, Stock */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#181716] block mb-1">
                    Categoria
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D5] text-xs text-[#181716] focus:outline-none focus:border-[#6B1D2F] cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#181716] block mb-1">
                    Coleção
                  </label>
                  <select
                    value={collection}
                    onChange={(e) => setCollection(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D5] text-xs text-[#181716] focus:outline-none focus:border-[#6B1D2F] cursor-pointer"
                  >
                    {collections.map((col) => (
                      <option key={col.id} value={col.name}>{col.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#181716] block mb-1">
                    Preço (R$) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D5] text-xs font-mono font-bold text-[#181716] focus:outline-none focus:border-[#6B1D2F]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#181716] block mb-1">
                    Preço Original
                  </label>
                  <input
                    type="number"
                    placeholder="Opcional"
                    value={originalPrice || ''}
                    onChange={(e) => setOriginalPrice(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D5] text-xs font-mono text-[#8C8476] focus:outline-none focus:border-[#6B1D2F]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#181716] block mb-1">
                    Estoque *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D5] text-xs font-mono font-bold text-[#181716] focus:outline-none focus:border-[#6B1D2F]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-semibold text-[#181716] block mb-1">
                  Descrição & História Editorial da Peça
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descreva o caimento, a inspiração parisiense e a proposta de estilo..."
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D5] text-xs text-[#181716] focus:outline-none focus:border-[#6B1D2F]"
                />
              </div>

              {/* Composition & Care */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#181716] block mb-1">
                    Composição do Tecido
                  </label>
                  <input
                    type="text"
                    value={composition}
                    onChange={(e) => setComposition(e.target.value)}
                    placeholder="Ex: 100% Lã Merino Escocesa"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D5] text-xs text-[#181716] focus:outline-none focus:border-[#6B1D2F]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#181716] block mb-1">
                    Cuidados de Lavagem
                  </label>
                  <input
                    type="text"
                    value={care}
                    onChange={(e) => setCare(e.target.value)}
                    placeholder="Ex: Lavagem a seco profissional em lavanderia"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8E1D5] text-xs text-[#181716] focus:outline-none focus:border-[#6B1D2F]"
                  />
                </div>
              </div>

              {/* Section: Cadastrar Tamanhos */}
              <div className="border border-[#E8E1D5] p-4 bg-[#FAF8F5]/60 space-y-3">
                <span className="text-xs font-semibold text-[#181716] uppercase tracking-wider block">
                  Grade de Tamanhos Disponíveis
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {['34', '36', '38', '40', '42', '44', 'U', 'P', 'M', 'G', 'GG'].map((s) => {
                    const isSelected = sizes.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => handleToggleSize(s)}
                        className={`px-3 py-1.5 text-xs font-mono font-medium transition-colors cursor-pointer border ${
                          isSelected 
                            ? 'bg-[#181716] text-[#FAF8F5] border-[#181716]' 
                            : 'bg-white text-[#5D574F] border-[#E8E1D5] hover:border-[#181716]'
                        }`}
                      >
                        {s} {isSelected && '✓'}
                      </button>
                    );
                  })}
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="Adicionar tamanho customizado (ex: 46, GG+)"
                    value={customSizeInput}
                    onChange={(e) => setCustomSizeInput(e.target.value)}
                    className="p-1.5 text-xs bg-white border border-[#E8E1D5] w-64 focus:outline-none focus:border-[#6B1D2F]"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomSize}
                    className="px-3 py-1.5 bg-[#181716] text-white text-xs font-medium cursor-pointer"
                  >
                    + Adicionar
                  </button>
                </div>
              </div>

              {/* Section: Cadastrar Cores */}
              <div className="border border-[#E8E1D5] p-4 bg-[#FAF8F5]/60 space-y-3">
                <span className="text-xs font-semibold text-[#181716] uppercase tracking-wider block flex items-center gap-2">
                  <Palette className="w-3.5 h-3.5 text-[#6B1D2F]" />
                  <span>Paleta de Cores do Produto</span>
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {colors.map((c, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-2 bg-white border border-[#E8E1D5] px-2.5 py-1 text-xs text-[#181716]"
                    >
                      <span 
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: c.hex }} 
                      />
                      <span>{c.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveColor(idx)}
                        className="text-[#8C8476] hover:text-[#C43828] ml-1 cursor-pointer"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E8E1D5]/60">
                  <input
                    type="text"
                    placeholder="Nome da cor (ex: Bordeaux, Camel, Marinho)"
                    value={newColorName}
                    onChange={(e) => setNewColorName(e.target.value)}
                    className="p-1.5 text-xs bg-white border border-[#E8E1D5] w-56 focus:outline-none focus:border-[#6B1D2F]"
                  />
                  <div className="flex items-center gap-1.5">
                    <input
                      type="color"
                      value={newColorHex}
                      onChange={(e) => setNewColorHex(e.target.value)}
                      className="w-8 h-7 p-0 border border-[#E8E1D5] cursor-pointer bg-white"
                    />
                    <span className="text-[11px] font-mono text-[#7A7367]">{newColorHex}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddColor}
                    className="px-3 py-1.5 bg-[#6B1D2F] text-white text-xs font-semibold cursor-pointer hover:bg-[#83263B]"
                  >
                    + Adicionar Cor
                  </button>
                </div>
              </div>

              {/* Section: Upload e Gerenciamento de Imagens da Peça */}
              <ImageUploadArea
                images={images}
                onChange={setImages}
                maxImages={8}
                label="Fotos do Produto (Upload Direto)"
                allowUrlFallback={true}
              />

              {/* Section: Switches / Checkboxes (Destaque, Novidade, Ativo) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-[#E8E1D5]">
                
                <label className="flex items-center gap-2.5 p-3 bg-[#FAF8F5] border border-[#E8E1D5] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    className="w-4 h-4 text-[#2A6E3F] focus:ring-0 rounded"
                  />
                  <div>
                    <span className="text-xs font-semibold text-[#181716] block">
                      Produto Ativo
                    </span>
                    <span className="text-[10px] text-[#7A7367]">
                      Visível na vitrine da loja
                    </span>
                  </div>
                </label>

                <label className="flex items-center gap-2.5 p-3 bg-[#FAF8F5] border border-[#E8E1D5] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4 h-4 text-[#C2A97E] focus:ring-0 rounded"
                  />
                  <div>
                    <span className="text-xs font-semibold text-[#181716] block">
                      Destaque Editorial
                    </span>
                    <span className="text-[10px] text-[#7A7367]">
                      Exibição prioritária
                    </span>
                  </div>
                </label>

                <label className="flex items-center gap-2.5 p-3 bg-[#FAF8F5] border border-[#E8E1D5] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newArrival}
                    onChange={(e) => setNewArrival(e.target.checked)}
                    className="w-4 h-4 text-[#6B1D2F] focus:ring-0 rounded"
                  />
                  <div>
                    <span className="text-xs font-semibold text-[#181716] block">
                      Marcar como Novidade
                    </span>
                    <span className="text-[10px] text-[#7A7367]">
                      Selo "Nouveau" no catálogo
                    </span>
                  </div>
                </label>

              </div>

              {/* Modal Action Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#E8E1D5]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 border border-[#D5CCC0] text-xs uppercase tracking-wider text-[#5D574F] hover:bg-[#FAF8F5] font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#6B1D2F] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#83263B] transition-colors cursor-pointer shadow-md"
                >
                  {isEditing ? 'Salvar Alterações' : 'Criar Peça no Catálogo'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E8E1D5] max-w-sm w-full p-6 text-center space-y-4 shadow-xl animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-[#FDF0EE] text-[#C43828] mx-auto flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-serif text-[#181716]">
                Confirmar Exclusão
              </h4>
              <p className="text-xs text-[#5D574F] mt-1">
                Tem certeza de que deseja excluir esta peça? Esta ação removerá o produto permanentemente do banco de dados e do catálogo da loja.
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
                onClick={() => handleDeleteProduct(deleteConfirmId)}
                className="w-1/2 py-2 bg-[#C43828] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#A82819] transition-colors cursor-pointer"
              >
                Sim, Excluir
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
