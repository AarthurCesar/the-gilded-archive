import { useRef, useState, useEffect } from 'react';
import { categories } from '../../data/products';

interface Props {
  selected: string;
  onSelect: (cat: string) => void;
}

export default function CategoryNav({ selected, onSelect }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showRight, setShowRight] = useState(false);
  const [showLeft, setShowLeft] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () => {
      const hasOverflow = el.scrollWidth > el.clientWidth;
      setShowLeft(hasOverflow && el.scrollLeft > 10);
      setShowRight(hasOverflow && el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
    };
    check();
    el.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      el.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, []);

  return (
    <div className="relative">
      <nav ref={scrollRef} className="flex overflow-x-auto no-scrollbar gap-3 px-4 py-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`
              shrink-0 whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium
              transition-all duration-300 ease-in-out
              ${
                selected === cat
                  ? 'gold-gradient text-on-primary shadow-lg shadow-primary/20'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
              }
            `}
          >
            {cat}
          </button>
        ))}
      </nav>
      {showLeft && (
        <button
          onClick={() => scrollRef.current?.scrollBy({ left: -150, behavior: 'smooth' })}
          className="absolute left-0 top-0 bottom-0 flex items-center"
        >
          <div className="w-12 h-full bg-gradient-to-r from-[#1A120B] to-transparent flex items-center justify-start pl-2">
            <span className="material-symbols-outlined text-primary/70 text-lg animate-pulse">
              chevron_left
            </span>
          </div>
        </button>
      )}
      {showRight && (
        <button
          onClick={() => scrollRef.current?.scrollBy({ left: 150, behavior: 'smooth' })}
          className="absolute right-0 top-0 bottom-0 flex items-center"
        >
          <div className="w-12 h-full bg-gradient-to-l from-[#1A120B] to-transparent flex items-center justify-end pr-2">
            <span className="material-symbols-outlined text-primary/70 text-lg animate-pulse">
              chevron_right
            </span>
          </div>
        </button>
      )}
    </div>
  );
}
