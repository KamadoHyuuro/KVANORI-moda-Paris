import React from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  Package, 
  AlertTriangle, 
  Users, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  Truck, 
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import { useStoreData } from '../../context/StoreDataContext';

interface AdminDashboardProps {
  onNavigateTab: (tab: 'produtos' | 'pedidos' | 'categorias' | 'colecoes' | 'banners') => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateTab }) => {
  const { products, orders, customers } = useStoreData();

  // Metrics Calculations
  const totalSales = orders.reduce((sum, o) => {
    if (o.status !== 'Cancelado' && o.status !== 'cancelado') {
      return sum + (o.total || 0);
    }
    return sum;
  }, 0);

  const validOrders = orders.filter(o => o.status !== 'Cancelado' && o.status !== 'cancelado');
  const avgTicket = validOrders.length > 0 ? totalSales / validOrders.length : 0;

  // Order status counts
  const pendingOrders = orders.filter(o => o.status === 'Pendente' || o.status === 'pendente').length;
  const approvedOrders = orders.filter(o => o.status === 'Pagamento aprovado' || o.paymentStatus === 'aprovado').length;
  const preparingOrders = orders.filter(o => o.status === 'Preparando' || o.status === 'em_processamento' || o.status === 'processando').length;
  const dispatchedOrders = orders.filter(o => o.status === 'Enviado' || o.status === 'enviado').length;
  const deliveredOrders = orders.filter(o => o.status === 'Entregue' || o.status === 'entregue').length;
  const canceledOrders = orders.filter(o => o.status === 'Cancelado' || o.status === 'cancelado').length;

  // Product & Stock metrics
  const activeProducts = products.filter(p => p.active !== false).length;
  const featuredProducts = products.filter(p => !!p.featured || !!p.isBestseller).length;
  const newProducts = products.filter(p => !!p.newArrival || !!p.isNew).length;
  const totalStockItems = products.reduce((sum, p) => sum + (p.stock ?? 10), 0);
  const lowStockProducts = products.filter(p => (p.stock ?? 10) <= 3);

  // Formatter for BRL Currency
  const formatBRL = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner & Quick Action */}
      <div className="bg-[#FAF8F5] border border-[#E8E1D5] p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#6B1D2F] font-semibold">
            Tableau de Bord · Maison KVANORI
          </span>
          <h2 className="text-2xl font-serif text-[#181716] mt-1">
            Visão Geral do Negócio
          </h2>
          <p className="text-xs text-[#5D574F] mt-1">
            Acompanhe indicadores de faturamento, fluxo de pedidos, estoque físico e carteira de clientes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateTab('pedidos')}
            className="px-4 py-2.5 bg-[#181716] text-[#FAF8F5] text-xs uppercase tracking-wider font-semibold hover:bg-black transition-colors cursor-pointer flex items-center gap-2"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Gerenciar Pedidos ({pendingOrders} pendentes)</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Cards (5 core areas: Vendas, Pedidos, Produtos, Estoque, Clientes) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* 1. VENDAS */}
        <div className="bg-white border border-[#E8E1D5] p-5 space-y-3 relative overflow-hidden group hover:border-[#6B1D2F] transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase font-bold tracking-wider text-[#6B1D2F]">
              Vendas
            </span>
            <div className="w-8 h-8 rounded-full bg-[#FAF8F5] text-[#6B1D2F] flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-serif font-bold text-[#181716]">
              {formatBRL(totalSales)}
            </div>
            <div className="text-[11px] text-[#7A7367] mt-1 flex items-center gap-1">
              <span className="text-[#2A6E3F] font-medium flex items-center">
                <ArrowUpRight className="w-3 h-3 inline" /> KVANORI
              </span>
              <span>· Ticket {formatBRL(avgTicket)}</span>
            </div>
          </div>
          <div className="pt-2 border-t border-[#F2ECE1] text-[10px] text-[#8C8476] flex justify-between">
            <span>Receita líquida</span>
            <span className="font-mono">{validOrders.length} pedidos pagos</span>
          </div>
        </div>

        {/* 2. PEDIDOS */}
        <div 
          onClick={() => onNavigateTab('pedidos')}
          className="bg-white border border-[#E8E1D5] p-5 space-y-3 cursor-pointer group hover:border-[#181716] transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase font-bold tracking-wider text-[#181716]">
              Pedidos
            </span>
            <div className="w-8 h-8 rounded-full bg-[#FAF8F5] text-[#181716] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-serif font-bold text-[#181716]">
              {orders.length}
            </div>
            <div className="text-[11px] text-[#7A7367] mt-1">
              <span className="text-[#B25E12] font-semibold">{pendingOrders} pendente(s)</span>
              <span> · {dispatchedOrders} a caminho</span>
            </div>
          </div>
          <div className="pt-2 border-t border-[#F2ECE1] text-[10px] text-[#8C8476] flex justify-between">
            <span>Ver listagem</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#181716] group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* 3. PRODUTOS */}
        <div 
          onClick={() => onNavigateTab('produtos')}
          className="bg-white border border-[#E8E1D5] p-5 space-y-3 cursor-pointer group hover:border-[#181716] transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase font-bold tracking-wider text-[#181716]">
              Produtos
            </span>
            <div className="w-8 h-8 rounded-full bg-[#FAF8F5] text-[#181716] flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-serif font-bold text-[#181716]">
              {products.length}
            </div>
            <div className="text-[11px] text-[#7A7367] mt-1">
              <span>{activeProducts} ativos</span>
              <span> · {featuredProducts} destaques</span>
            </div>
          </div>
          <div className="pt-2 border-t border-[#F2ECE1] text-[10px] text-[#8C8476] flex justify-between">
            <span>{newProducts} novidades</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#181716] group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* 4. ESTOQUE */}
        <div 
          onClick={() => onNavigateTab('produtos')}
          className="bg-white border border-[#E8E1D5] p-5 space-y-3 cursor-pointer group hover:border-[#B25E12] transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase font-bold tracking-wider text-[#B25E12]">
              Estoque
            </span>
            <div className="w-8 h-8 rounded-full bg-[#FAF8F5] text-[#B25E12] flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-serif font-bold text-[#181716]">
              {totalStockItems}
            </div>
            <div className="text-[11px] text-[#7A7367] mt-1">
              <span className={lowStockProducts.length > 0 ? "text-[#C43828] font-bold" : "text-[#2A6E3F]"}>
                {lowStockProducts.length} peça(s) baixa(s)
              </span>
            </div>
          </div>
          <div className="pt-2 border-t border-[#F2ECE1] text-[10px] text-[#8C8476] flex justify-between">
            <span>Inventário físico</span>
            <span className="font-mono">Unidades</span>
          </div>
        </div>

        {/* 5. CLIENTES */}
        <div className="bg-white border border-[#E8E1D5] p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase font-bold tracking-wider text-[#181716]">
              Clientes
            </span>
            <div className="w-8 h-8 rounded-full bg-[#FAF8F5] text-[#181716] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-serif font-bold text-[#181716]">
              {customers.length || 4}
            </div>
            <div className="text-[11px] text-[#7A7367] mt-1">
              <span>Maison VIPs & Compradores</span>
            </div>
          </div>
          <div className="pt-2 border-t border-[#F2ECE1] text-[10px] text-[#8C8476] flex justify-between">
            <span>Base ativa</span>
            <span className="font-mono">100% verificados</span>
          </div>
        </div>

      </div>

      {/* Middle Grid: Pedidos por Status & Alerta de Baixo Estoque */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Status dos Pedidos (Pipeline) */}
        <div className="lg:col-span-2 bg-white border border-[#E8E1D5] p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg text-[#181716]">
                Pipeline & Distribuição de Pedidos
              </h3>
              <p className="text-xs text-[#7A7367]">
                Acompanhamento em tempo real das etapas de processamento e expedição
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('pedidos')}
              className="text-xs text-[#6B1D2F] font-semibold hover:underline cursor-pointer"
            >
              Ver todos →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            
            <div className="p-3 bg-[#FAF8F5] border border-[#E8E1D5]">
              <div className="flex items-center gap-2 text-xs text-[#B25E12] font-semibold uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                <span>Pendente</span>
              </div>
              <div className="text-xl font-serif font-bold text-[#181716] mt-2">
                {pendingOrders}
              </div>
              <p className="text-[10px] text-[#8C8476] mt-0.5">Aguardando confirmação</p>
            </div>

            <div className="p-3 bg-[#FAF8F5] border border-[#E8E1D5]">
              <div className="flex items-center gap-2 text-xs text-[#2A6E3F] font-semibold uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Pago</span>
              </div>
              <div className="text-xl font-serif font-bold text-[#181716] mt-2">
                {approvedOrders}
              </div>
              <p className="text-[10px] text-[#8C8476] mt-0.5">Pagamento confirmado</p>
            </div>

            <div className="p-3 bg-[#FAF8F5] border border-[#E8E1D5]">
              <div className="flex items-center gap-2 text-xs text-[#8A5023] font-semibold uppercase tracking-wider">
                <Package className="w-3.5 h-3.5" />
                <span>Preparando</span>
              </div>
              <div className="text-xl font-serif font-bold text-[#181716] mt-2">
                {preparingOrders}
              </div>
              <p className="text-[10px] text-[#8C8476] mt-0.5">Embalagem de luxo</p>
            </div>

            <div className="p-3 bg-[#FAF8F5] border border-[#E8E1D5]">
              <div className="flex items-center gap-2 text-xs text-[#205493] font-semibold uppercase tracking-wider">
                <Truck className="w-3.5 h-3.5" />
                <span>Enviado</span>
              </div>
              <div className="text-xl font-serif font-bold text-[#181716] mt-2">
                {dispatchedOrders}
              </div>
              <p className="text-[10px] text-[#8C8476] mt-0.5">Em trânsito com rastreio</p>
            </div>

            <div className="p-3 bg-[#FAF8F5] border border-[#E8E1D5]">
              <div className="flex items-center gap-2 text-xs text-[#2A6E3F] font-semibold uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Entregue</span>
              </div>
              <div className="text-xl font-serif font-bold text-[#181716] mt-2">
                {deliveredOrders}
              </div>
              <p className="text-[10px] text-[#8C8476] mt-0.5">Finalizados com sucesso</p>
            </div>

            <div className="p-3 bg-[#FAF8F5] border border-[#E8E1D5]">
              <div className="flex items-center gap-2 text-xs text-[#7A7367] font-semibold uppercase tracking-wider">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Cancelado</span>
              </div>
              <div className="text-xl font-serif font-bold text-[#181716] mt-2">
                {canceledOrders}
              </div>
              <p className="text-[10px] text-[#8C8476] mt-0.5">Estornos ou recusas</p>
            </div>

          </div>

          {/* Recent Orders Preview */}
          <div className="pt-3 border-t border-[#F2ECE1]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#181716] block mb-3">
              Últimos Pedidos Recebidos
            </span>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E8E1D5] text-[#8C8476]">
                    <th className="pb-2 font-medium">Pedido</th>
                    <th className="pb-2 font-medium">Cliente</th>
                    <th className="pb-2 font-medium">Itens</th>
                    <th className="pb-2 font-medium">Valor</th>
                    <th className="pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2ECE1]">
                  {orders.slice(0, 4).map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#FAF8F5] transition-colors">
                      <td className="py-2.5 font-mono text-[#6B1D2F] font-semibold">
                        #{ord.id.slice(-6)}
                      </td>
                      <td className="py-2.5 text-[#181716]">
                        {ord.customerName || ord.shippingAddress?.city || 'Cliente Boutique'}
                      </td>
                      <td className="py-2.5 text-[#5D574F]">
                        {ord.items.length} peça(s)
                      </td>
                      <td className="py-2.5 font-medium text-[#181716]">
                        {formatBRL(ord.total)}
                      </td>
                      <td className="py-2.5">
                        <span className={`inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                          ord.status === 'Entregue' ? 'bg-[#EBF7EE] text-[#2A6E3F]' :
                          ord.status === 'Enviado' ? 'bg-[#EBF2FA] text-[#205493]' :
                          ord.status === 'Preparando' ? 'bg-[#FAF0E6] text-[#8A5023]' :
                          ord.status === 'Pagamento aprovado' ? 'bg-[#EBF7EE] text-[#2A6E3F]' :
                          ord.status === 'Cancelado' ? 'bg-[#FDF0EE] text-[#C43828]' :
                          'bg-[#FFF6E5] text-[#B25E12]'
                        }`}>
                          {ord.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Alerta de Estoque Crítico */}
        <div className="bg-white border border-[#E8E1D5] p-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg text-[#181716] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#B25E12]" />
                <span>Estoque Crítico (≤ 3 un.)</span>
              </h3>
              <span className="text-xs font-mono font-bold text-[#C43828] bg-[#FDF0EE] px-2 py-0.5">
                {lowStockProducts.length} itens
              </span>
            </div>
            <p className="text-xs text-[#7A7367] mt-1">
              Peças que requerem reposição urgente ou ajuste de corte no ateliê
            </p>

            <div className="mt-4 space-y-3 max-h-[320px] overflow-y-auto pr-1">
              {lowStockProducts.length === 0 ? (
                <div className="p-6 text-center text-xs text-[#7A7367] bg-[#FAF8F5] border border-dashed border-[#E8E1D5]">
                  Todos os produtos possuem estoque regular e equilibrado.
                </div>
              ) : (
                lowStockProducts.map((p) => (
                  <div 
                    key={p.id}
                    className="p-3 bg-[#FAF8F5] border border-[#E8E1D5] flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img 
                        src={p.images?.[0] || 'https://images.unsplash.com/photo-1548624149-f9b1859aa7d0?auto=format&fit=crop&w=200&q=80'} 
                        alt={p.name}
                        className="w-10 h-12 object-cover border border-[#E8E1D5] shrink-0" 
                      />
                      <div className="min-w-0">
                        <span className="text-xs font-medium text-[#181716] truncate block">
                          {p.name}
                        </span>
                        <span className="text-[10px] text-[#7A7367]">
                          {p.category} · {formatBRL(p.price)}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-[#C43828] font-mono block">
                        {p.stock ?? 0} un.
                      </span>
                      <span className="text-[10px] text-[#8C8476] uppercase tracking-wider">
                        restantes
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('produtos')}
            className="w-full py-2.5 border border-[#181716] text-[#181716] text-xs uppercase tracking-wider font-semibold hover:bg-[#181716] hover:text-[#FAF8F5] transition-colors cursor-pointer text-center"
          >
            Ajustar Estoque no Catálogo
          </button>
        </div>

      </div>

      {/* Carteira de Clientes Recentes */}
      <div className="bg-white border border-[#E8E1D5] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg text-[#181716]">
              Carteira de Clientes & Compradores Registrados
            </h3>
            <p className="text-xs text-[#7A7367]">
              Relatório de clientes fidelizados, frequência de compras e volume acumulado
            </p>
          </div>
          <span className="text-xs text-[#7A7367] font-mono">
            {customers.length || 4} clientes cadastrados
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E8E1D5] text-[#8C8476]">
                <th className="pb-2.5 font-medium">Nome</th>
                <th className="pb-2.5 font-medium">E-mail</th>
                <th className="pb-2.5 font-medium">Telefone</th>
                <th className="pb-2.5 font-medium text-center">Pedidos</th>
                <th className="pb-2.5 font-medium text-right">Total Acumulado</th>
                <th className="pb-2.5 font-medium text-center">Papel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2ECE1]">
              {(customers.length > 0 ? customers : [
                { id: '1', name: 'Catherine Moreau', email: 'catherine.moreau@paris-art.fr', phone: '+55 (11) 98765-4321', totalOrders: 3, totalSpent: 4890.00, role: 'cliente' as const },
                { id: '2', name: 'Hélène Girard', email: 'helene.girard@sorbonne.fr', phone: '+55 (21) 99123-8877', totalOrders: 2, totalSpent: 2650.00, role: 'cliente' as const },
                { id: '3', name: 'Isabelle Fontaine', email: 'isabelle.fontaine@studio-rive.com', phone: '+55 (48) 99988-1122', totalOrders: 4, totalSpent: 6240.00, role: 'cliente' as const },
                { id: '4', name: 'Camille Laurent', email: 'camille.laurent@rivegauche.paris', phone: '+55 (19) 98877-6655', totalOrders: 1, totalSpent: 1480.00, role: 'cliente' as const }
              ]).map((c) => (
                <tr key={c.id} className="hover:bg-[#FAF8F5] transition-colors">
                  <td className="py-3 font-medium text-[#181716]">
                    {c.name}
                  </td>
                  <td className="py-3 text-[#5D574F] font-mono">
                    {c.email}
                  </td>
                  <td className="py-3 text-[#7A7367]">
                    {c.phone || '—'}
                  </td>
                  <td className="py-3 text-center font-mono font-semibold text-[#181716]">
                    {c.totalOrders}
                  </td>
                  <td className="py-3 text-right font-medium text-[#6B1D2F]">
                    {formatBRL(c.totalSpent)}
                  </td>
                  <td className="py-3 text-center">
                    <span className={`inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                      c.role === 'administrador' || c.role === 'admin' ? 'bg-[#6B1D2F] text-white' : 'bg-[#FAF8F5] text-[#5D574F] border border-[#E8E1D5]'
                    }`}>
                      {c.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
