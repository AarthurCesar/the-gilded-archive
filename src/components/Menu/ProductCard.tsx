import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/format';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addItem } = useCart();

  return (
    <div className="bg-surface-container-high rounded-lg overflow-hidden border border-primary/10 shadow-2xl shadow-black/40 flex flex-col">
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-on-surface text-sm font-bold leading-tight">
            {product.name}
          </h3>
          <p className="text-on-surface-variant text-xs mt-1 line-clamp-2 opacity-70">
            {product.description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="font-serif text-primary font-bold text-base">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={() =>
              addItem({
                productId: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
              })
            }
            className="w-9 h-9 rounded-full gold-gradient flex items-center justify-center
                       text-on-primary font-bold text-lg shadow-md shadow-primary/20
                       hover:shadow-lg hover:shadow-primary/30 transition-all duration-300
                       active:scale-95 min-w-[48px] min-h-[48px]"
            aria-label={`Adicionar ${product.name}`}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
