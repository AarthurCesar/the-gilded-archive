import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/format';

export default function FloatingCart() {
  const { totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-24 left-0 w-full px-4 z-50">
      <button
        onClick={() => navigate('/carrinho')}
        className="w-full gold-gradient rounded-full py-4 px-6 flex items-center justify-between
                   text-on-primary font-semibold shadow-2xl shadow-primary/30
                   hover:shadow-primary/40 transition-all duration-300 active:scale-[0.98]"
      >
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-xl">shopping_bag</span>
          <div className="bg-on-primary/10 rounded-full px-4 py-1.5 flex items-center gap-2">
            <span className="text-sm font-bold">{totalItems} {totalItems === 1 ? 'item' : 'itens'}</span>
            <div className="w-1 h-1 bg-on-primary/30 rounded-full" />
            <span className="text-sm">Ver pedido</span>
          </div>
        </div>
        <span className="font-serif font-bold text-lg">{formatPrice(totalPrice)}</span>
      </button>
    </div>
  );
}
