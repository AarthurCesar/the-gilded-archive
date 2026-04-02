import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext';
import { formatPrice } from '../../utils/format';
import CartItemCard from './CartItem';

export default function CartPage() {
  const { cart, totalItems, totalPrice, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();

  const [tableNumber, setTableNumber] = useState<string>(
    cart.tableNumber?.toString() ?? ''
  );
  const [notes, setNotes] = useState('');
  const [confirmed, setConfirmed] = useState<string | null>(null);

  const tableValid = tableNumber !== '' && Number(tableNumber) >= 1 && Number(tableNumber) <= 99;
  const canSubmit = cart.items.length > 0 && tableValid;

  const handleSubmit = () => {
    if (!canSubmit) return;
    const orderId = addOrder(cart.items, Number(tableNumber), notes);
    clearCart();
    setConfirmed(orderId);
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 rounded-full gold-gradient flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-on-primary text-4xl">check</span>
        </div>
        <h1 className="font-serif text-primary text-2xl font-bold mb-2">Pedido Enviado!</h1>
        <p className="text-on-surface-variant mb-1">Número do pedido:</p>
        <p className="font-serif text-on-surface text-lg font-bold mb-8">
          #{confirmed.replace('order_', '').slice(-6)}
        </p>
        <button
          onClick={() => navigate('/')}
          className="gold-gradient rounded-full py-3.5 px-10 text-on-primary font-semibold
                     shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
        >
          Voltar ao Menu
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface relative">
      {/* Wood grain overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=800&fit=crop")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-14 z-50 header-glass flex items-center justify-between px-4 border-b border-primary/10">
        <button onClick={() => navigate('/')} className="w-10 text-primary">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="font-serif text-on-surface text-lg font-bold">Seu Pedido</h1>
        <div className="w-10" />
      </header>

      {/* Content */}
      <main className="relative z-10 pt-20 pb-32 px-4 max-w-[390px] mx-auto min-h-screen flex flex-col">
        {cart.items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-5xl text-on-surface-variant/30 mb-4">
              shopping_bag
            </span>
            <p className="text-on-surface-variant">Seu carrinho está vazio</p>
            <button
              onClick={() => navigate('/')}
              className="mt-6 text-primary font-medium hover:underline"
            >
              Ver cardápio
            </button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="space-y-3">
              {cart.items.map((item) => (
                <CartItemCard key={item.productId} item={item} />
              ))}
            </div>

            {/* Ornamental divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
              <div className="mx-4 rotate-45 w-1.5 h-1.5 bg-primary/40" />
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            </div>

            {/* Observations */}
            <div className="mb-4">
              <label className="text-on-surface-variant text-xs font-medium uppercase tracking-wider mb-2 block">
                Observações
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex.: ponto da carne, alergias, restrições..."
                className="w-full bg-surface-container-lowest rounded-sm p-3 text-on-surface text-sm
                           border-b border-transparent focus:border-primary transition-colors
                           placeholder:text-champagne/40 resize-none outline-none"
                rows={2}
              />
            </div>

            {/* Table Number */}
            <div className="mb-6">
              <label className="text-on-surface-variant text-xs font-medium uppercase tracking-wider mb-2 block text-center">
                Número da Mesa
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={1}
                  max={99}
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="w-full bg-surface-container-lowest rounded-sm p-4 text-center text-on-surface
                             font-serif text-3xl font-bold border-b-2 border-transparent
                             focus:border-primary transition-colors outline-none
                             [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="—"
                />
              </div>
            </div>

            {/* Summary */}
            <div className="bg-surface-container-low rounded-[14px] p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-champagne text-sm">Subtotal</span>
                <span className="text-on-surface font-serif font-medium">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-champagne text-sm">Itens</span>
                <span className="text-on-surface-variant text-sm">{totalItems} {totalItems === 1 ? 'item' : 'itens'}</span>
              </div>
              <div className="my-3.5 border-t border-dashed border-primary/15" />
              <div className="flex justify-between items-end">
                <span className="text-on-surface font-serif font-bold text-lg">Total</span>
                <span className="text-primary font-serif font-bold text-2xl">{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Submit Button */}
      {cart.items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-surface/90 backdrop-blur-md z-50 flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`w-full max-w-[390px] rounded-full py-4 px-6 font-semibold text-base
                       flex items-center justify-center gap-2 transition-all duration-300
                       ${
                         canSubmit
                           ? 'gold-gradient text-on-primary shadow-lg shadow-primary/30 hover:shadow-primary/40 active:scale-[0.98]'
                           : 'bg-surface-container-high text-on-surface-variant/40 cursor-not-allowed'
                       }`}
          >
            Confirmar Pedido
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
        </div>
      )}
    </div>
  );
}
