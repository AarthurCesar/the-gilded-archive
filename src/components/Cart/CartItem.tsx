import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/format';
import type { CartItem as CartItemType } from '../../types';

interface Props {
  item: CartItemType;
}

export default function CartItemCard({ item }: Props) {
  const { increment, decrement, removeItem } = useCart();

  return (
    <div className="bg-surface-container-high rounded-[14px] p-4 border border-primary/10 relative group">
      <div className="flex items-start">
        {/* Image */}
        <div className="w-[60px] h-[60px] rounded-[12px] overflow-hidden shrink-0 border border-outline-variant/20">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </div>

        {/* Info */}
        <div className="ml-3.5 flex-1">
          <h3 className="font-serif text-on-surface text-sm font-bold">{item.name}</h3>
          <p className="text-champagne text-xs mt-0.5">{formatPrice(item.price)} /un</p>
        </div>

        {/* Controls + Price */}
        <div className="flex flex-col items-end justify-between self-stretch">
          {/* Remove */}
          <button
            onClick={() => removeItem(item.productId)}
            className="text-on-surface-variant/40 hover:text-error transition-colors p-1"
            aria-label="Remover item"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>

          {/* Quantity */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => decrement(item.productId)}
              className="w-7 h-7 rounded-full border border-primary/20 flex items-center justify-center text-primary text-sm hover:bg-primary/10 transition-colors"
            >
              −
            </button>
            <span className="font-serif text-on-surface font-bold text-sm w-7 text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => increment(item.productId)}
              className="w-7 h-7 rounded-full border border-primary/20 flex items-center justify-center text-primary text-sm hover:bg-primary/10 transition-colors"
            >
              +
            </button>
          </div>

          {/* Subtotal */}
          <span className="font-serif text-primary font-bold text-sm mt-1">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
