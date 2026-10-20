import React from 'react';
import { Package, Clock, CheckCircle, Truck, AlertCircle, ArrowLeft, ShoppingBag, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useStoreData } from '../context/StoreDataContext';
import { useNavigation } from '../context/NavigationContext';

export const OrdersView: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const { orders, isLoading } = useStoreData();
  const { navigateTo, setIsAccountModalOpen } = useNavigation();

  // If not logged in, prompt user
  if (!user) {
    return (
      <div className="bg-[#FAF8F5] min-h-[70vh] py-16 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white border border-[#E8E1D5] p-8 text-center space-y-4 shadow-sm">
          <Package className="w-12 h-12 mx-auto text-[#7A746B]" />
          <h2 className="text-2xl font-serif text-[#181716]">Histórico de Pedidos</h2>
          <p className="text-xs text-[#5D574F] leading-relaxed">
            Para visualizar seus pedidos salvos no Cloud Firestore, acesse sua conta da boutique.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => setIsAccountModalOpen(true)}
              className="w-full py-3 bg-[#181716] text-[#FAF8F5] text-xs uppercase tracking-wider font-semibold hover:bg-[#6B1D2F] transition-colors cursor-pointer"
            >
              Entrar ou Cadastrar
            </button>
            <button
              onClick={() => navigateTo('catalog')}
              className="w-full py-2.5 border border-[#D5CCC0] text-[#181716] text-xs uppercase tracking-wider font-medium hover:bg-[#FAF8F5] cursor-pointer"
            >
              Voltar ao Catálogo
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Filter orders: If admin, can view all, otherwise only their own
  const displayedOrders = isAdmin 
    ? orders 
    : orders.filter(o => o.userId === user.id);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'entregue':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#294B24] bg-[#E8F0E6] px-2 py-0.5 rounded-xs">
            <CheckCircle className="w-3 h-3" /> Entregue
          </span>
        );
      case 'enviado':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1F3A52] bg-[#E2ECF5] px-2 py-0.5 rounded-xs">
            <Truck className="w-3 h-3" /> Em Trânsito
          </span>
        );
      case 'processando':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#664D14] bg-[#F7F1D8] px-2 py-0.5 rounded-xs">
            <Clock className="w-3 h-3" /> Processando no Ateliê
          </span>
        );
      case 'pendente':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#5B3E22] bg-[#F4EFE6] px-2 py-0.5 rounded-xs">
            <Clock className="w-3 h-3" /> Pedido Registrado
          </span>
        );
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigateTo('catalog')}
            className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-[#736E66] hover:text-[#181716] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Voltar à Boutique</span>
          </button>

          {isAdmin && (
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-[#6B1D2F] text-white">
              Visão de Administrador (Todos os Pedidos)
            </span>
          )}
        </div>

        {/* Header */}
        <div className="border-b border-[#E8E1D5] pb-6 mb-8">
          <span className="text-xs uppercase tracking-[0.25em] text-[#7A746B] font-sans">
            Commandes & Suivi · Cloud Firestore
          </span>
          <h1 className="text-3xl font-serif text-[#181716] tracking-tight mt-1">
            {isAdmin ? 'Todos os Pedidos da Maison' : 'Meus Pedidos'}
          </h1>
          <p className="text-xs sm:text-sm text-[#5D574F] font-serif italic mt-1">
            Acompanhe a confecção, status de expedição e registro persistente de suas aquisições.
          </p>
        </div>

        {/* Content list */}
        {displayedOrders.length === 0 ? (
          <div className="bg-white border border-[#E8E1D5] p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#FAF8F5] mx-auto flex items-center justify-center text-[#8C8578]">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif text-[#181716]">Nenhum pedido registrado ainda</h3>
            <p className="text-xs text-[#6B655B] max-w-sm mx-auto leading-relaxed">
              Você ainda não finalizou compras nesta conta. Visite o catálogo para adicionar peças clássicas da alfaiataria parisiense.
            </p>
            <button
              onClick={() => navigateTo('catalog')}
              className="px-6 py-2.5 bg-[#181716] text-[#FAF8F5] text-xs uppercase tracking-wider font-semibold hover:bg-[#6B1D2F] transition-colors cursor-pointer"
            >
              Explorar Catálogo
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {displayedOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-[#E8E1D5] p-5 sm:p-6 shadow-xs space-y-4"
              >
                {/* Header card info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#EFEBE4] gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#8A8377]">
                      ID Firestore: {order.id}
                    </span>
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-serif font-medium text-[#181716]">
                        {order.customerName ? `Pedido de ${order.customerName}` : 'Pedido KVANORI'}
                      </h3>
                      <span className="text-xs text-[#7A746B]">•</span>
                      <span className="text-xs text-[#7A746B]">
                        {new Date(order.createdAt).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {getStatusBadge(order.status)}
                    <span className="text-[11px] text-[#6B1D2F] font-semibold bg-[#FDF0EE] px-2 py-0.5 rounded-xs">
                      Pagamento {order.paymentStatus}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="divide-y divide-[#F2EDE4] py-1">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        {item.product.images?.[0] && (
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-12 h-14 object-cover border border-[#E0D8CB]"
                          />
                        )}
                        <div>
                          <p className="font-serif font-medium text-[#181716]">
                            {item.quantity}x {item.product.name}
                          </p>
                          <p className="text-[11px] text-[#787166]">
                            Cor: {item.selectedColor.name} · Tamanho: {item.selectedSize}
                          </p>
                        </div>
                      </div>

                      <span className="font-serif font-semibold text-[#181716] tabular-nums">
                        R$ {(item.product.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Shipping & Financial Breakdown */}
                <div className="bg-[#FAF8F5] p-3 border border-[#EAE3D6] text-xs flex flex-col sm:flex-row justify-between gap-3">
                  <div className="space-y-1">
                    <span className="font-semibold text-[#181716] flex items-center gap-1.5 text-[11px]">
                      <MapPin className="w-3.5 h-3.5 text-[#6B1D2F]" />
                      Endereço de Entrega:
                    </span>
                    <p className="text-[#595349] text-[11px]">
                      {order.shippingAddress.street}, {order.shippingAddress.number} - {order.shippingAddress.neighborhood}, {order.shippingAddress.city}/{order.shippingAddress.state} · CEP {order.shippingAddress.zip}
                    </p>
                  </div>

                  <div className="sm:text-right space-y-0.5 shrink-0">
                    <div className="text-[11px] text-[#6D675E]">
                      Subtotal: R$ {order.subtotal.toFixed(2).replace('.', ',')} | Frete: {order.shipping === 0 ? 'Cortesia' : `R$ ${order.shipping.toFixed(2)}`}
                    </div>
                    <div className="text-sm font-serif font-bold text-[#181716]">
                      Total: R$ {order.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
