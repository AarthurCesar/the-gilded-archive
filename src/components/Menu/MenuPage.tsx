import { useState, useMemo } from 'react';
import { products } from '../../data/products';
import CategoryNav from './CategoryNav';
import ProductCard from './ProductCard';
import FloatingCart from './FloatingCart';

export default function MenuPage() {
  const [category, setCategory] = useState('Todos');

  const filtered = useMemo(
    () =>
      category === 'Todos'
        ? products
        : products.filter((p) => p.category === category),
    [category]
  );

  return (
    <div className="min-h-screen wood-texture">
      {/* Header */}
      <header className="bg-[#1A120B]/80 backdrop-blur-xl text-primary-container fixed top-0 left-0 right-0 z-50 border-b border-outline-variant/15 shadow-2xl shadow-black/20 flex justify-center h-20">
        <div className="flex items-center justify-center w-full max-w-2xl px-6">
          <div className="flex flex-col items-center w-full">
            <h1 className="font-serif text-primary text-xl font-bold tracking-wide uppercase">
              The Gilded Archive
            </h1>
            {/* Ornamental divider */}
            <div className="flex items-center gap-3 w-full mt-1">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
              <div className="w-1.5 h-1.5 rotate-45 bg-primary/40" />
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-primary/40 to-transparent" />
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="relative z-10 pt-24 pb-40 max-w-2xl mx-auto">
        <CategoryNav selected={category} onSelect={setCategory} />

        <div className="grid grid-cols-2 gap-4 px-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      {/* Floating Cart */}
      <FloatingCart />
    </div>
  );
}
