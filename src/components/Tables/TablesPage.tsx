import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../../context/OrderContext';
import { formatPrice } from '../../utils/format';
import PixPayment from './PixPayment';
import type { Order } from '../../types';

export default function TablesPage() {
  const { orders, closeTable } = useOrders();
  const navigate = useNavigate();
  const [pixTable, setPixTable] = useState<{ table: number; total: number } | null>(null);

  const tables = useMemo(() => {
    const map = new Map<number, Order[]>();
    orders.forEach((order) => {
      const list = map.get(order.tableNumber) || [];
      list.push(order);
      map.set(order.tableNumber, list);
    });
    return Array.from(map.entries())
      .sort(([a], [b]) => a - b)
      .map(([table, tableOrders]) => {
        // Flatten all items, combining duplicates
        const itemMap = new Map<string, { name: string; quantity: number; price: number }>();
        tableOrders.forEach((order) => {
          order.items.forEach((item) => {
            const existing = itemMap.get(item.productId);
            if (existing) {
              existing.quantity += item.quantity;
            } else {
              itemMap.set(item.productId, { name: item.name, quantity: item.quantity, price: item.price });
            }
          });
        });

        const allReady = tableOrders.every((o) => o.status === 'pronto');
        const hasPending = tableOrders.some((o) => o.status !== 'pronto');

        return {
          table,
          orders: tableOrders,
          items: Array.from(itemMap.values()),
          total: tableOrders.reduce((sum, o) => sum + o.total, 0),
          allReady,
          hasPending,
        };
      });
  }, [orders]);

  const handleCloseTable = (tableNumber: number) => {
    closeTable(tableNumber);
    setPixTable(null);
  };

  return (
    <div className="min-h-screen bg-[#120E0A] text-ivory">
      {/* Header */}
      <header className="h-[68px] bg-[#1E1610] border-b border-primary/10 px-8 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/cozinha')} className="w-10 text-primary">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/5 rounded-full border border-primary/20">
              <span className="material-symbols-outlined text-primary">receipt_long</span>
            </div>
            <div>
              <h1 className="font-serif text-on-surface font-bold text-lg leading-tight">Contas</h1>
              <p className="text-champagne text-xs">Fechamento por Mesa</p>
            </div>
          </div>
        </div>
        <p className="text-champagne text-sm">
          {tables.length} {tables.length === 1 ? 'mesa aberta' : 'mesas abertas'}
        </p>
      </header>

      <main className="p-6 max-w-[1440px] mx-auto">
        {tables.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <span className="material-symbols-outlined text-5xl text-on-surface-variant/30 mb-4">
              receipt_long
            </span>
            <p className="text-champagne/60 text-lg">Nenhuma mesa aberta</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tables.map(({ table, items, total, allReady, hasPending, orders: tableOrders }) => (
              <div
                key={table}
                className="bg-[#1E1610] rounded-2xl border border-primary/10 overflow-hidden flex flex-col"
              >
                {/* Table header */}
                <div className="px-5 py-4 border-b border-primary/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center">
                      <span className="font-serif text-primary font-bold text-xl">{table}</span>
                    </div>
                    <div>
                      <h2 className="font-serif text-on-surface font-bold">Mesa {table}</h2>
                      <p className="text-champagne text-xs">
                        {tableOrders.length} {tableOrders.length === 1 ? 'pedido' : 'pedidos'}
                      </p>
                    </div>
                  </div>
                  {hasPending ? (
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-status/15 text-amber-status">
                      Em andamento
                    </span>
                  ) : (
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-status/15 text-green-status">
                      Tudo pronto
                    </span>
                  )}
                </div>

                {/* Consolidated items list */}
                <div className="px-5 py-4 flex-1">
                  <p className="text-champagne text-xs font-medium uppercase tracking-wider mb-3">Consumo</p>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.name} className="flex justify-between text-sm">
                        <span className="text-on-surface-variant">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="text-champagne">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total + close button */}
                <div className="px-5 py-4 border-t border-primary/10 bg-[#160F0A]">
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-on-surface font-serif font-bold text-lg">Total</span>
                    <span className="text-primary font-serif font-bold text-2xl">{formatPrice(total)}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setPixTable({ table, total })}
                      className="flex-1 py-3 rounded-full gold-gradient text-on-primary font-semibold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-lg">pix</span>
                      PIX
                    </button>
                    <button
                      onClick={() => handleCloseTable(table)}
                      className="flex-1 py-3 rounded-full border border-primary/20 text-champagne font-semibold text-sm hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-lg">payments</span>
                      Outros
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {pixTable && (
        <PixPayment
          tableNumber={pixTable.table}
          total={pixTable.total}
          onClose={() => setPixTable(null)}
          onConfirmPaid={() => handleCloseTable(pixTable.table)}
        />
      )}
    </div>
  );
}
