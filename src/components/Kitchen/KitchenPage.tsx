import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useOrders } from '../../context/OrderContext';
import type { OrderStatus } from '../../types';
import OrderCard from './OrderCard';

const filters = [
  { label: 'Todos', value: 'todos' },
  { label: 'Novos', value: 'novo' },
  { label: 'Preparando', value: 'preparando' },
  { label: 'Prontos', value: 'pronto' },
] as const;

type FilterValue = (typeof filters)[number]['value'];

const columnConfig: Record<OrderStatus, { title: string; borderColor: string; textColor: string }> = {
  novo: { title: 'NOVOS PEDIDOS', borderColor: 'border-amber-status/35', textColor: 'text-amber-status' },
  preparando: { title: 'EM PREPARO', borderColor: 'border-blue-status/35', textColor: 'text-blue-status' },
  pronto: { title: 'PRONTOS PARA SERVIR', borderColor: 'border-green-status/35', textColor: 'text-green-status' },
};

export default function KitchenPage() {
  const { orders } = useOrders();
  const [filter, setFilter] = useState<FilterValue>('todos');

  const grouped = useMemo(() => {
    const statuses: OrderStatus[] = ['novo', 'preparando', 'pronto'];
    return statuses.map((status) => ({
      status,
      orders: orders
        .filter((o) => o.status === status)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    }));
  }, [orders]);

  const now = new Date();
  const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' });

  return (
    <div className="min-h-screen bg-[#120E0A] text-ivory">
      {/* Header */}
      <header className="h-[68px] bg-[#1E1610] border-b border-primary/10 px-8 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/5 rounded-full border border-primary/20">
            <span className="material-symbols-outlined text-primary">soup_kitchen</span>
          </div>
          <div>
            <h1 className="font-serif text-on-surface font-bold text-lg leading-tight">Cozinha</h1>
            <p className="text-champagne text-xs">Painel de Pedidos</p>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-3">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all
                ${
                  filter === f.value
                    ? 'bg-primary/15 text-primary border border-primary/30'
                    : 'text-champagne hover:text-on-surface-variant'
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Tables + Clock */}
        <div className="flex items-center gap-4 text-right">
          <Link
            to="/mesas"
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium hover:bg-primary/20 transition-all"
          >
            <span className="material-symbols-outlined text-lg">table_restaurant</span>
            Mesas
          </Link>
        </div>
        <div className="flex items-center gap-4 text-right">
          <div>
            <p className="text-on-surface font-serif font-bold text-xl">{timeStr}</p>
            <p className="text-champagne text-xs">{dateStr}</p>
          </div>
        </div>
      </header>

      {/* Kanban Columns */}
      <main className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-[1440px] mx-auto min-h-[calc(100vh-68px)]">
        {grouped.map(({ status, orders: columnOrders }) => {
          if (filter !== 'todos' && filter !== status) return null;
          const config = columnConfig[status];

          return (
            <section key={status} className="flex flex-col gap-5">
              <header className={`pb-2 border-b-4 ${config.borderColor}`}>
                <div className="flex items-center justify-between mb-2">
                  <h2 className={`font-sans font-bold text-sm tracking-wider ${config.textColor}`}>
                    {config.title}
                  </h2>
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full
                      ${status === 'novo' ? 'bg-amber-status/15 text-amber-status' : ''}
                      ${status === 'preparando' ? 'bg-blue-status/15 text-blue-status' : ''}
                      ${status === 'pronto' ? 'bg-green-status/15 text-green-status' : ''}`}
                  >
                    {columnOrders.length}
                  </span>
                </div>
              </header>

              <div className="flex flex-col gap-4">
                {columnOrders.length === 0 ? (
                  <p className="text-champagne/40 text-sm text-center py-8">Nenhum pedido</p>
                ) : (
                  columnOrders.map((order) => <OrderCard key={order.id} order={order} />)
                )}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
