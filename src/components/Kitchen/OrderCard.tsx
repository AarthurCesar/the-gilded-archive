import type { Order } from '../../types';
import { useOrders } from '../../context/OrderContext';

interface Props {
  order: Order;
}

const statusConfig = {
  novo: {
    border: 'border-amber-status',
    badge: 'bg-amber-status/15 text-amber-status',
    button: 'gold-gradient text-on-primary',
    buttonText: 'Iniciar Preparo',
    buttonIcon: 'arrow_forward',
    pulse: true,
  },
  preparando: {
    border: 'border-blue-status',
    badge: 'bg-blue-status/15 text-blue-status',
    button: 'bg-blue-status text-white',
    buttonText: 'Marcar Pronto',
    buttonIcon: 'check',
    pulse: false,
  },
  pronto: {
    border: 'border-green-status',
    badge: 'bg-green-status/15 text-green-status',
    button: 'bg-surface-container-highest text-on-surface-variant',
    buttonText: 'Finalizar Pedido',
    buttonIcon: 'done_all',
    pulse: false,
  },
};

export default function OrderCard({ order }: Props) {
  const { advanceStatus, removeOrder } = useOrders();
  const config = statusConfig[order.status];

  const createdAt = new Date(order.createdAt);
  const now = new Date();
  const diffMin = Math.round((now.getTime() - createdAt.getTime()) / 60000);
  const timeStr = createdAt.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const handleAction = () => {
    if (order.status === 'pronto') {
      removeOrder(order.id);
    } else {
      advanceStatus(order.id);
    }
  };

  return (
    <div
      className={`bg-[#2B1E12] rounded-[14px] p-5 border-l-4 ${config.border}
                  shadow-[0_3px_12px_rgba(0,0,0,0.35)]
                  ${config.pulse ? 'order-pulse' : ''}
                  ${order.status === 'pronto' ? 'opacity-90 hover:opacity-100 transition-opacity' : ''}`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <span className="font-serif text-primary font-bold text-lg">
          #{order.id.replace('order_', '').slice(-4)}
        </span>
        <span className="bg-surface-container-highest text-champagne text-xs px-2.5 py-1 rounded-full font-medium">
          Mesa {order.tableNumber}
        </span>
      </div>

      {/* Time */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-1.5 text-champagne">
          <span className="material-symbols-outlined text-sm">schedule</span>
          <span className="text-xs">{timeStr}</span>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full ${config.badge}`}>
          {diffMin > 0 ? `há ${diffMin} min` : 'agora'}
        </span>
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-primary/10 my-3" />

      {/* Items */}
      <div className="space-y-1.5 mb-3">
        {order.items.map((item) => (
          <div key={item.productId} className="flex justify-between text-sm">
            <span className="text-on-surface">
              <span className="text-primary font-medium">{item.quantity}x</span>{' '}
              {item.name}
            </span>
          </div>
        ))}
      </div>

      {/* Notes */}
      {order.notes && (
        <div className="mt-4 bg-[#1E1610] p-3 rounded-[10px] flex gap-2">
          <span className="material-symbols-outlined text-champagne text-sm mt-0.5">chat_bubble</span>
          <p className="text-champagne text-xs italic">{order.notes}</p>
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleAction}
        className={`mt-4 w-full py-2.5 rounded-full font-semibold text-sm flex items-center justify-center gap-2
                   transition-all duration-300 hover:brightness-110 active:scale-[0.98] ${config.button}`}
      >
        {config.buttonText}
        <span className="material-symbols-outlined text-base">{config.buttonIcon}</span>
      </button>
    </div>
  );
}
