import type { Product } from '../types';

export const categories = [
  'Todos',
  'Destaques',
  'Carnes',
  'Massas',
  'Sobremesas',
  'Bebidas',
] as const;

export const products: Product[] = [
  // Destaques
  {
    id: 'prod_001',
    name: 'Filé ao Molho Madeira',
    description: 'Filé mignon grelhado com molho madeira e batatas rústicas',
    price: 89.90,
    category: 'Destaques',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop',
  },
  {
    id: 'prod_002',
    name: 'Camarão Internacional',
    description: 'Camarões flambados ao conhaque com arroz de açafrão',
    price: 112.00,
    category: 'Destaques',
    image: 'https://images.unsplash.com/photo-1625943553852-781c6dd46faa?w=400&h=300&fit=crop',
  },
  // Carnes
  {
    id: 'prod_003',
    name: 'Picanha na Brasa',
    description: 'Picanha grelhada no ponto com farofa especial',
    price: 98.90,
    category: 'Carnes',
    image: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?w=400&h=300&fit=crop',
  },
  {
    id: 'prod_004',
    name: 'Salmão Grelhado',
    description: 'Salmão com crosta de ervas e legumes grelhados',
    price: 94.90,
    category: 'Carnes',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
  },
  {
    id: 'prod_005',
    name: 'Costela no Bafo',
    description: 'Costela bovina cozida lentamente por 8 horas',
    price: 79.90,
    category: 'Carnes',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
  },
  // Massas
  {
    id: 'prod_006',
    name: 'Risoto de Funghi',
    description: 'Risoto cremoso com mix de cogumelos frescos',
    price: 68.90,
    category: 'Massas',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop',
  },
  {
    id: 'prod_007',
    name: 'Fettuccine Alfredo',
    description: 'Massa fresca ao molho alfredo com parmesão',
    price: 58.90,
    category: 'Massas',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400&h=300&fit=crop',
  },
  // Sobremesas
  {
    id: 'prod_008',
    name: 'Tiramisù',
    description: 'Clássico italiano com mascarpone e café espresso',
    price: 38.00,
    category: 'Sobremesas',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop',
  },
  {
    id: 'prod_009',
    name: 'Petit Gâteau',
    description: 'Bolo de chocolate com centro derretido e sorvete',
    price: 34.90,
    category: 'Sobremesas',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop',
  },
  // Bebidas
  {
    id: 'prod_010',
    name: 'Suco Natural',
    description: 'Suco de fruta natural da estação (500ml)',
    price: 16.90,
    category: 'Bebidas',
    image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=300&fit=crop',
  },
  {
    id: 'prod_011',
    name: 'Água Mineral',
    description: 'Água mineral sem gás (500ml)',
    price: 8.90,
    category: 'Bebidas',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=300&fit=crop',
  },
  {
    id: 'prod_012',
    name: 'Refrigerante',
    description: 'Coca-Cola, Guaraná ou Sprite (350ml)',
    price: 12.00,
    category: 'Bebidas',
    image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=400&h=300&fit=crop',
  },
];
