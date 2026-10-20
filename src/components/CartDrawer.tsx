import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Check, MapPin, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';
import { useAuth } from '../context/AuthContext';
import { useStoreData } from '../context/StoreDataContext';
import { ShippingAddress } from '../types';

export const CartDrawer: React.FC = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    subtotal,
    shipping,
    discountCode,
    discountAmount,
    applyDiscount,
    removeDiscount,
    totalItems,
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    clearCart
  } = useCart();

  const { openProduct, navigateTo, setIsAccountModalOpen } = useNavigation();
  const { user, setAuthPromptMessage } = useAuth();
  const { placeOrder } = useStoreData();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  // Checkout address form
  const [address, setAddress] = useState<ShippingAddress>({
    street: 'Boulevard Saint-Germain',
    number: '142',
    neighborhood: '6ème arrondissement',
    city: 'Paris (ou São Paulo)',
    state: 'SP',
    zip: '75006',
    country: 'Brasil'
  });
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [orderCreatedId, setOrderCreatedId] = useState<string | null>(null);
  const [orderError, setOrderError] = useState<string | null>(null);

  // Free shipping threshold
  const freeShippingThreshold = 600;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const grandTotal = Math.max(0, subtotal - discountAmount + shipping);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyDiscount(inputCoupon);
    setCouponFeedback(res);
    if (res.success) {
      setInputCoupon('');
    }
  };

  const handleStartCheckout = () => {
    if (!user) {
      setIsCartOpen(false);
      setAuthPromptMessage('Entre na sua conta para continuar.');
      setIsAccountModalOpen(true);
      return;
    }
    setOrderCreatedId(null);
    setOrderError(null);
    setIsCheckoutModalOpen(true);
  };

  const handleFinalizeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setIsCheckoutModalOpen(false);
      setAuthPromptMessage('Entre na sua conta para continuar.');
      setIsAccountModalOpen(true);
      return;
    }

    setIsSubmittingOrder(true);
    setOrderError(null);

    try {
      const created = await placeOrder({
        userId: user.id,
        customerName: user.name,
        customerEmail: user.email,
        items: [...items],
        subtotal,
        shipping,
        total: grandTotal,
        status: 'pendente',
        paymentStatus: 'pendente',
        shippingAddress: address
      });

      setOrderCreatedId(created.id);
      clearCart();
    } catch (err: any) {
      setOrderError(err.message || 'Erro ao registrar pedido no Firestore.');
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-over Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col border-l border-[#E8E1D5]">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E8E1D5] flex items-center justify-between bg-white/70">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#181716]" />
            <h2 className="text-base font-serif uppercase tracking-widest text-[#181716] font-medium">
              Sacola de Compras
            </h2>
            <span className="text-xs text-[#7A756D] font-sans tabular-nums">({totalItems})</span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-[#181716] hover:text-[#6B1D2F] transition-colors cursor-pointer"
            aria-label="Fechar sacola"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="p-4 bg-[#F2EDE4] border-b border-[#E4DDD0] text-xs">
          {remainingForFreeShipping > 0 ? (
            <div className="space-y-1.5">
              <p className="text-[#4A4742]">
                Adicione mais <strong className="text-[#6B1D2F] tabular-nums">R$ {remainingForFreeShipping.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong> para frete cortesia
              </p>
              <div className="w-full bg-[#DFD6C9] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#384837] h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-[#384837] font-medium">
              <Check className="w-4 h-4" />
              <span>Você garantiu Frete Cortesia do nosso Ateliê!</span>
            </div>
          )}
        </div>

        {/* Itemized List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#EBE5DB]">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#EFEBE4] flex items-center justify-center text-[#8C8578]">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif text-[#181716]">Sua sacola está vazia</h3>
              <p className="text-xs text-[#736E65] max-w-xs leading-relaxed">
                Descubra as criações da coleção Paris 1986 e escolha peças de alfaiataria atemporais.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('catalog');
                }}
                className="px-6 py-2.5 bg-[#181716] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium hover:bg-[#6B1D2F] transition-colors cursor-pointer"
              >
                Explorar Coleção
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.product.id}-${item.selectedColor.name}-${item.selectedSize}`} className="py-4 flex gap-4">
                
                {/* Thumbnail */}
                <div
                  onClick={() => {
                    setIsCartOpen(false);
                    openProduct(item.product);
                  }}
                  className="w-20 h-26 bg-[#EBE5DB] shrink-0 border border-[#E0D8CB] overflow-hidden cursor-pointer"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4
                        onClick={() => {
                          setIsCartOpen(false);
                          openProduct(item.product);
                        }}
                        className="text-sm font-serif font-medium text-[#181716] hover:text-[#6B1D2F] transition-colors cursor-pointer line-clamp-1"
                      >
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedColor.name, item.selectedSize)}
                        className="text-[#968F83] hover:text-[#6B1D2F] transition-colors p-1 cursor-pointer"
                        title="Remover peça"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-[#716C63] pt-0.5">
                      Cor: <strong>{item.selectedColor.name}</strong> · Tam: <strong>{item.selectedSize}</strong>
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {/* Stepper */}
                    <div className="flex items-center border border-[#D5CCC0] bg-white text-xs">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedColor.name, item.selectedSize, -1)}
                        className="px-2 py-1 hover:bg-[#F2EDE4] text-[#4F4B44] cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-1 tabular-nums font-medium text-[#181716]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedColor.name, item.selectedSize, 1)}
                        className="px-2 py-1 hover:bg-[#F2EDE4] text-[#4F4B44] cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    {/* Line Total */}
                    <span className="text-xs font-serif font-semibold text-[#181716] tabular-nums">
                      R$ {(item.product.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Subtotal, Promo & Simulated Checkout */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#E8E1D5] bg-white/80 space-y-4">
            
            {/* Promo code form */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[#968F83]" />
                <input
                  type="text"
                  placeholder="Cupom (ex: PARIS1986)"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs border border-[#D5CCC0] bg-[#FAF8F5] focus:outline-hidden focus:border-[#181716] uppercase"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-1.5 text-xs uppercase font-medium bg-[#181716] text-[#FAF8F5] hover:bg-[#6B1D2F] transition-colors cursor-pointer"
              >
                Aplicar
              </button>
            </form>

            {couponFeedback && (
              <p className={`text-[11px] ${couponFeedback.success ? 'text-[#384837]' : 'text-[#6B1D2F]'}`}>
                {couponFeedback.message}
              </p>
            )}

            {discountCode && (
              <div className="flex items-center justify-between text-xs text-[#384837] bg-[#E9EFE9] px-2 py-1">
                <span>Cupom ativo: <strong>{discountCode}</strong></span>
                <button
                  onClick={removeDiscount}
                  className="text-[#6B1D2F] underline hover:no-underline text-[10px] cursor-pointer"
                >
                  Remover
                </button>
              </div>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#5D5850]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="tabular-nums">R$ {subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#6B1D2F]">
                  <span>Desconto de Ateliê</span>
                  <span className="tabular-nums">- R$ {discountAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Envio para o Brasil</span>
                <span className="tabular-nums">
                  {shipping === 0 ? <strong className="text-[#384837]">Cortesia</strong> : `R$ ${shipping.toFixed(2).replace('.', ',')}`}
                </span>
              </div>

              <div className="border-t border-[#E8E1D5] pt-2 flex justify-between text-sm font-serif font-bold text-[#181716]">
                <span>Total</span>
                <span className="tabular-nums text-base">
                  R$ {grandTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleStartCheckout}
              className="w-full py-3.5 bg-[#181716] hover:bg-[#353330] text-[#FAF8F5] text-xs uppercase tracking-[0.14em] font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
            >
              <span>Avançar para Pedido</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#7A756D]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#384837]" />
              <span>Armazenamento persistente no Cloud Firestore</span>
            </div>
          </div>
        )}

      </div>

      {/* Checkout Order Confirmation Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FAF8F5] max-w-lg w-full border border-[#E8E1D5] p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
            <button
              onClick={() => setIsCheckoutModalOpen(false)}
              className="absolute top-4 right-4 text-[#181716] hover:text-[#6B1D2F] p-1.5 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {orderCreatedId ? (
              /* ORDER CONFIRMATION VIEW */
              <div className="space-y-5 text-center py-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#E8F0E6] text-[#294B24] flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-[0.25em] text-[#78726A]">Commande Enregistrée</span>
                  <h3 className="text-2xl font-serif text-[#181716]">
                    Pedido Registrado com Sucesso!
                  </h3>
                  <p className="text-xs text-[#5D574F] font-serif italic">
                    Referência no Firestore: <strong className="font-mono text-[#181716]">{orderCreatedId}</strong>
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#E8E1D5] text-xs text-left space-y-2">
                  <div className="flex justify-between border-b border-[#EFEBE4] pb-2">
                    <span className="text-[#787166]">Status do Pedido:</span>
                    <span className="font-semibold text-[#181716] uppercase tracking-wider text-[11px]">Pendente</span>
                  </div>
                  <div className="flex justify-between border-b border-[#EFEBE4] pb-2">
                    <span className="text-[#787166]">Status de Pagamento:</span>
                    <span className="font-semibold text-[#6B1D2F] uppercase tracking-wider text-[11px]">Pendente (Etapa futura)</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-[#787166]">Total:</span>
                    <span className="font-serif font-bold text-sm text-[#181716]">
                      R$ {grandTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      setIsCheckoutModalOpen(false);
                      setIsCartOpen(false);
                      navigateTo('orders');
                    }}
                    className="flex-1 py-3 bg-[#181716] text-[#FAF8F5] text-xs uppercase tracking-wider font-semibold hover:bg-[#6B1D2F] transition-colors cursor-pointer"
                  >
                    Ver Meus Pedidos
                  </button>
                  <button
                    onClick={() => {
                      setIsCheckoutModalOpen(false);
                      setIsCartOpen(false);
                      navigateTo('catalog');
                    }}
                    className="flex-1 py-3 border border-[#D5CCC0] text-[#181716] text-xs uppercase tracking-wider font-medium hover:bg-[#F2EDE4] transition-colors cursor-pointer"
                  >
                    Continuar Comprando
                  </button>
                </div>
              </div>
            ) : (
              /* CHECKOUT FORM VIEW */
              <form onSubmit={handleFinalizeOrder} className="space-y-5">
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-[0.25em] text-[#78726A]">Finalisation de Commande</span>
                  <h3 className="text-2xl font-serif text-[#181716]">
                    Confirmar Pedido no Ateliê
                  </h3>
                  <p className="text-xs text-[#5D574F] font-serif italic">
                    Os dados do pedido serão salvos na coleção <strong className="font-mono text-[#181716]">ORDERS</strong> do Firestore.
                  </p>
                </div>

                {orderError && (
                  <div className="p-3 bg-[#FDF0EE] border border-[#F3C5BF] text-[#7E2419] text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{orderError}</span>
                  </div>
                )}

                {/* Authentication Gate */}
                {!user ? (
                  <div className="p-4 bg-[#F2EDE4] border border-[#E3DCB8] text-xs space-y-3">
                    <div className="flex items-center gap-2 text-[#6B1D2F] font-semibold">
                      <AlertCircle className="w-4 h-4" />
                      <span>Identificação Necessária</span>
                    </div>
                    <p className="text-[#595349]">
                      Para vincular o pedido ao seu perfil e persistir no banco de dados, por favor acesse sua conta ou crie uma conta em segundos.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCheckoutModalOpen(false);
                        setIsAccountModalOpen(true);
                      }}
                      className="w-full py-2.5 bg-[#181716] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium hover:bg-[#6B1D2F] transition-colors cursor-pointer"
                    >
                      Entrar ou Criar Conta
                    </button>
                  </div>
                ) : (
                  <div className="p-3 bg-white border border-[#E8E1D5] flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[#787166] text-[11px] block">Cliente Autenticado:</span>
                      <strong className="text-[#181716] font-medium">{user.name}</strong> ({user.email})
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-[#E8F0E6] text-[#294B24]">
                      {user.role}
                    </span>
                  </div>
                )}

                {/* Shipping address form */}
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#181716] uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5 text-[#6B1D2F]" />
                    <span>Endereço para Entrega</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="col-span-2">
                      <label className="block text-[#615C54] text-[11px] mb-1">Rua / Logradouro</label>
                      <input
                        type="text"
                        required
                        value={address.street}
                        onChange={(e) => setAddress({ ...address, street: e.target.value })}
                        className="w-full p-2 bg-white border border-[#D5CCC0] text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[#615C54] text-[11px] mb-1">Número</label>
                      <input
                        type="text"
                        required
                        value={address.number}
                        onChange={(e) => setAddress({ ...address, number: e.target.value })}
                        className="w-full p-2 bg-white border border-[#D5CCC0] text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="block text-[#615C54] text-[11px] mb-1">Bairro</label>
                      <input
                        type="text"
                        required
                        value={address.neighborhood}
                        onChange={(e) => setAddress({ ...address, neighborhood: e.target.value })}
                        className="w-full p-2 bg-white border border-[#D5CCC0] text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[#615C54] text-[11px] mb-1">Cidade / Estado</label>
                      <input
                        type="text"
                        required
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        className="w-full p-2 bg-white border border-[#D5CCC0] text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-white/70 border border-[#E8E1D5] p-3 space-y-2 text-xs">
                  <div className="flex justify-between text-[#5D5850]">
                    <span>Itens ({totalItems}):</span>
                    <span className="tabular-nums">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#6B1D2F]">
                      <span>Desconto:</span>
                      <span className="tabular-nums">- R$ {discountAmount.toFixed(2).replace('.', ',')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#5D5850]">
                    <span>Frete:</span>
                    <span>{shipping === 0 ? 'Cortesia' : `R$ ${shipping.toFixed(2).replace('.', ',')}`}</span>
                  </div>
                  <div className="border-t border-[#E8E1D5] pt-1.5 flex justify-between font-serif font-bold text-sm text-[#181716]">
                    <span>Total:</span>
                    <span className="tabular-nums">R$ {grandTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCheckoutModalOpen(false)}
                    className="flex-1 py-3 border border-[#D5CCC0] text-[#181716] text-xs uppercase tracking-wider font-medium hover:bg-[#EFEBE4] transition-colors cursor-pointer"
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    disabled={!user || isSubmittingOrder}
                    className="flex-1 py-3 bg-[#181716] disabled:bg-[#8C8780] text-[#FAF8F5] text-xs uppercase tracking-wider font-semibold hover:bg-[#6B1D2F] transition-colors cursor-pointer"
                  >
                    {isSubmittingOrder ? 'Gravando Pedido...' : 'Confirmar Pedido'}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}
    </>
  );
};
