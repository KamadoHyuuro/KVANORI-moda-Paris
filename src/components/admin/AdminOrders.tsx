import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Check, 
  Clock, 
  Truck, 
  AlertCircle, 
  X, 
  ChevronRight, 
  MapPin, 
  CreditCard,
  User,
  Eye,
  Calendar
} from 'lucide-react';
import { useStoreData } from '../../context/StoreDataContext';
import { Order, OrderStatus } from '../../types';

const ORDER_STATUS_OPTIONS: OrderStatus[] = [
  'Pendente',
  'Pagamento aprovado',
  'Preparando',
  'Enviado',
  'Entregue',
  'Cancelado'
];

export const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus } = useStoreData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('Todos');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<string | null>(null);

  const showFeedback = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    setIsUpdatingStatus(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
      showFeedback('success', `Status do pedido #${orderId.slice(-6)} alterado para "${newStatus}".`);
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (err: any) {
      showFeedback('error', err.message || 'Erro ao alterar status.');
    } finally {
      setIsUpdatingStatus(null);
    }
  };

  const formatBRL = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return 'Data não informada';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoString;
    }
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'Entregue':
      case 'entregue':
        return 'bg-[#EBF7EE] text-[#2A6E3F] border-[#C4E7CC]';
      case 'Enviado':
      case 'enviado':
        return 'bg-[#EBF2FA] text-[#205493] border-[#BAD1EE]';
      case 'Preparando':
      case 'em_processamento':
      case 'processando':
        return 'bg-[#FAF0E6] text-[#8A5023] border-[#EAD0B8]';
      case 'Pagamento aprovado':
        return 'bg-[#EBF7EE] text-[#2A6E3F] border-[#C4E7CC]';
      case 'Cancelado':
      case 'cancelado':
        return 'bg-[#FDF0EE] text-[#C43828] border-[#F5C2BC]';
      default:
        return 'bg-[#FFF6E5] text-[#B25E12] border-[#FCE1B6]';
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch = 
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (o.customerName && o.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (o.customerEmail && o.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (o.shippingAddress?.city && o.shippingAddress.city.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = 
      selectedStatusFilter === 'Todos' || 
      o.status.toLowerCase() === selectedStatusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#E8E1D5] p-5">
        <div>
          <h2 className="text-xl font-serif text-[#181716]">
            Gerenciamento de Pedidos
          </h2>
          <p className="text-xs text-[#5D574F] mt-0.5">
            Acompanhe compras de clientes, endereços de entrega, valores e atualize o pipeline logístico.
          </p>
        </div>

        <div className="text-xs font-mono text-[#6B1D2F] bg-[#FAF8F5] border border-[#E8E1D5] px-3.5 py-2">
          {orders.length} pedidos registrados
        </div>
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

      {/* Filters Bar */}
      <div className="bg-white border border-[#E8E1D5] p-4 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C8476]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por número, cliente, e-mail ou cidade..."
            className="w-full pl-9 pr-3 py-2 bg-[#FAF8F5] border border-[#E8E1D5] text-xs text-[#181716] focus:outline-none focus:border-[#6B1D2F]"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <label className="text-xs text-[#5D574F] whitespace-nowrap">Filtrar Status:</label>
          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="py-2 px-3 bg-[#FAF8F5] border border-[#E8E1D5] text-xs text-[#181716] focus:outline-none focus:border-[#6B1D2F] cursor-pointer"
          >
            <option value="Todos">Todos os status</option>
            {ORDER_STATUS_OPTIONS.map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
          <span className="text-xs text-[#8C8476] font-mono">
            {filteredOrders.length} resultado(s)
          </span>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-[#E8E1D5] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#E8E1D5] text-[#7A7367] uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4 font-semibold">Número do Pedido</th>
                <th className="py-3 px-4 font-semibold">Cliente</th>
                <th className="py-3 px-4 font-semibold">Produtos</th>
                <th className="py-3 px-4 font-semibold">Valor</th>
                <th className="py-3 px-4 font-semibold">Pagamento</th>
                <th className="py-3 px-4 font-semibold">Status do Pedido</th>
                <th className="py-3 px-4 font-semibold">Data</th>
                <th className="py-3 px-4 font-semibold text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2ECE1]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-xs text-[#7A7367]">
                    Nenhum pedido encontrado com os filtros selecionados.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => {
                  return (
                    <tr key={ord.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                      {/* Número do pedido */}
                      <td className="py-3 px-4 font-mono font-bold text-[#6B1D2F]">
                        #{ord.id.slice(-8)}
                      </td>

                      {/* Cliente */}
                      <td className="py-3 px-4">
                        <span className="font-medium text-[#181716] block">
                          {ord.customerName || 'Cliente Maison'}
                        </span>
                        <span className="text-[10px] text-[#7A7367] block truncate max-w-[180px]">
                          {ord.customerEmail || ord.userId || '—'}
                        </span>
                      </td>

                      {/* Produtos */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          {ord.items.slice(0, 3).map((item, idx) => (
                            <img
                              key={idx}
                              src={item.product?.images?.[0] || 'https://images.unsplash.com/photo-1548624149-f9b1859aa7d0?auto=format&fit=crop&w=80&q=80'}
                              alt={item.product?.name || 'Item'}
                              title={`${item.product?.name} (${item.quantity}x, ${item.selectedSize})`}
                              className="w-8 h-10 object-cover border border-[#E8E1D5]"
                            />
                          ))}
                          <div className="text-[11px] text-[#5D574F] ml-1">
                            <span className="font-medium">{ord.items.length} item(s)</span>
                          </div>
                        </div>
                      </td>

                      {/* Valor */}
                      <td className="py-3 px-4">
                        <span className="font-serif font-bold text-sm text-[#181716] block">
                          {formatBRL(ord.total)}
                        </span>
                        <span className="text-[10px] text-[#8C8476]">
                          Frete: {ord.shipping === 0 ? 'Cortesia' : formatBRL(ord.shipping)}
                        </span>
                      </td>

                      {/* Pagamento */}
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#181716]">
                          <CreditCard className="w-3 h-3 text-[#6B1D2F]" />
                          <span>Cartão / PIX</span>
                        </span>
                        <span className={`block text-[10px] font-semibold uppercase tracking-wider mt-0.5 ${
                          ord.paymentStatus === 'aprovado' ? 'text-[#2A6E3F]' : 'text-[#B25E12]'
                        }`}>
                          {ord.paymentStatus || 'Aprovado'}
                        </span>
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-3 px-4">
                        <select
                          value={ord.status}
                          disabled={isUpdatingStatus === ord.id}
                          onChange={(e) => handleStatusChange(ord.id, e.target.value as OrderStatus)}
                          className={`py-1 px-2.5 text-xs font-semibold uppercase tracking-wider border rounded-none focus:outline-none cursor-pointer transition-colors ${getStatusBadgeStyle(ord.status)}`}
                        >
                          {ORDER_STATUS_OPTIONS.map((st) => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                        </select>
                      </td>

                      {/* Data */}
                      <td className="py-3 px-4 text-[11px] text-[#7A7367] whitespace-nowrap">
                        {formatDate(ord.createdAt)}
                      </td>

                      {/* Ação */}
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="px-2.5 py-1 text-xs text-[#181716] bg-[#FAF8F5] border border-[#E8E1D5] hover:border-[#6B1D2F] hover:text-[#6B1D2F] transition-colors cursor-pointer inline-flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Detalhes</span>
                        </button>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E8E1D5] max-w-2xl w-full p-6 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto animate-fadeIn">
            
            <div className="flex items-center justify-between border-b border-[#E8E1D5] pb-4">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#6B1D2F] font-semibold">
                  Maison KVANORI · Expedição
                </span>
                <h3 className="text-xl font-serif text-[#181716] mt-0.5">
                  Pedido #{selectedOrder.id}
                </h3>
                <span className="text-xs text-[#7A7367] flex items-center gap-1 mt-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(selectedOrder.createdAt)}
                </span>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)} 
                className="text-[#7A7367] hover:text-[#181716] p-1.5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Status Control Inside Modal */}
            <div className="p-4 bg-[#FAF8F5] border border-[#E8E1D5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#5D574F] block">
                  Status Atual da Encomenda
                </span>
                <span className="text-xs text-[#7A7367]">
                  Altere para notificar o cliente e avançar a logística
                </span>
              </div>
              <select
                value={selectedOrder.status}
                onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value as OrderStatus)}
                className={`py-1.5 px-3 text-xs font-semibold uppercase tracking-wider border cursor-pointer ${getStatusBadgeStyle(selectedOrder.status)}`}
              >
                {ORDER_STATUS_OPTIONS.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            {/* Customer & Address Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="border border-[#E8E1D5] p-4 bg-white space-y-2">
                <span className="text-xs font-semibold text-[#181716] uppercase tracking-wider block flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#6B1D2F]" />
                  <span>Dados do Cliente</span>
                </span>
                <p className="text-sm font-medium text-[#181716]">
                  {selectedOrder.customerName || 'Cliente Cadastrado'}
                </p>
                <p className="text-xs text-[#5D574F] font-mono">
                  {selectedOrder.customerEmail || 'email@cliente.com'}
                </p>
                <p className="text-[11px] text-[#7A7367]">
                  Conta ID: {selectedOrder.userId}
                </p>
              </div>

              <div className="border border-[#E8E1D5] p-4 bg-white space-y-2">
                <span className="text-xs font-semibold text-[#181716] uppercase tracking-wider block flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#6B1D2F]" />
                  <span>Endereço de Entrega</span>
                </span>
                {selectedOrder.shippingAddress ? (
                  <div className="text-xs text-[#5D574F] space-y-0.5">
                    <p className="text-[#181716] font-medium">
                      {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.number}
                      {selectedOrder.shippingAddress.complement ? ` - ${selectedOrder.shippingAddress.complement}` : ''}
                    </p>
                    <p>{selectedOrder.shippingAddress.neighborhood}</p>
                    <p>{selectedOrder.shippingAddress.city} - {selectedOrder.shippingAddress.state}</p>
                    <p className="font-mono text-[#7A7367]">CEP: {selectedOrder.shippingAddress.zip}</p>
                  </div>
                ) : (
                  <p className="text-xs text-[#7A7367]">Endereço registrado na conta do cliente.</p>
                )}
              </div>

            </div>

            {/* Products List in this Order */}
            <div className="space-y-3">
              <span className="text-xs font-semibold text-[#181716] uppercase tracking-wider block">
                Itens Inclusos na Encomenda ({selectedOrder.items.length})
              </span>
              <div className="divide-y divide-[#E8E1D5] border border-[#E8E1D5]">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="p-3 bg-white flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product?.images?.[0] || 'https://images.unsplash.com/photo-1548624149-f9b1859aa7d0?auto=format&fit=crop&w=120&q=80'}
                        alt={item.product?.name || 'Peça'}
                        className="w-12 h-14 object-cover border border-[#E8E1D5]"
                      />
                      <div>
                        <h4 className="text-xs font-serif font-medium text-[#181716]">
                          {item.product?.name}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-[#7A7367] mt-0.5">
                          <span>Tam: <strong className="text-[#181716]">{item.selectedSize}</strong></span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            Cor: 
                            <span 
                              className="w-2.5 h-2.5 rounded-full border border-black/20" 
                              style={{ backgroundColor: item.selectedColor?.hex || '#181716' }}
                            />
                            <strong className="text-[#181716]">{item.selectedColor?.name || 'Padrão'}</strong>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono text-[#5D574F] block">
                        {item.quantity}x {formatBRL(item.product?.price || 0)}
                      </span>
                      <span className="text-xs font-serif font-bold text-[#181716]">
                        {formatBRL((item.product?.price || 0) * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="bg-[#FAF8F5] border border-[#E8E1D5] p-4 space-y-2 text-xs">
              <div className="flex justify-between text-[#5D574F]">
                <span>Subtotal dos Produtos</span>
                <span className="font-mono">{formatBRL(selectedOrder.subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#5D574F]">
                <span>Frete Especial KVANORI</span>
                <span className="font-mono">{selectedOrder.shipping === 0 ? 'Gratuito' : formatBRL(selectedOrder.shipping)}</span>
              </div>
              <div className="pt-2 border-t border-[#E8E1D5] flex justify-between font-serif text-base font-bold text-[#181716]">
                <span>Valor Total</span>
                <span className="text-[#6B1D2F] font-sans font-bold">{formatBRL(selectedOrder.total)}</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-2.5 bg-[#181716] text-[#FAF8F5] text-xs uppercase tracking-wider font-semibold hover:bg-black transition-colors cursor-pointer"
              >
                Fechar Detalhes
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
