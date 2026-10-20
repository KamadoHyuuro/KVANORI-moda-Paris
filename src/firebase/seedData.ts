import { Product, CategoryItem, CollectionItem, BannerItem, CustomerData, Order } from '../types';
import { PRODUCTS, CATEGORIES_LIST } from '../data/products';

export const INITIAL_BANNERS: BannerItem[] = [
  {
    id: 'banner-paris-1986',
    title: 'PARIS, 1986.',
    subtitle: '“L\'élégance ne vieillit jamais.”',
    kicker: 'Collection Automne-Hiver · Boutique Saint-Germain',
    description: 'Inspirada no estilo French Preppy e na intelectualidade de Saint-Germain-des-Prés. Alfaiataria impecável em tweed de lã, saias plissadas, boinas autênticas e a atemporalidade da feminilidade clássica.',
    image: '/src/assets/images/hero_paris_1986_editorial_1790164814011.jpg',
    buttonText: 'Descobrir coleção',
    link: 'catalog',
    active: true,
    order: 1
  },
  {
    id: 'banner-rive-gauche-tailleurs',
    title: 'SILHOUETTES D\'AUTOMNE',
    subtitle: '“L\'art de vivre parisien dans chaque couture.”',
    kicker: 'Atelier KVANORI · Pièces Uniques',
    description: 'Blazers estruturados em tweed escocês, camisas em popeline de algodão egípcio e mocassins nobres para os dias de brisa no Quartier Latin.',
    image: '/src/assets/images/look_french_preppy_silhouette_1790164828265.jpg',
    buttonText: 'Explorar Looks',
    link: 'looks',
    active: true,
    order: 2
  }
];

export const INITIAL_CUSTOMERS: CustomerData[] = [
  {
    id: 'usr_catherine_deneuve',
    name: 'Catherine Moreau',
    email: 'catherine.moreau@paris-art.fr',
    phone: '+55 (11) 98765-4321',
    totalOrders: 3,
    totalSpent: 4890.00,
    lastOrderDate: new Date(Date.now() - 86400000 * 2).toISOString(),
    role: 'cliente'
  },
  {
    id: 'usr_helene_girard',
    name: 'Hélène Girard',
    email: 'helene.girard@sorbonne.fr',
    phone: '+55 (21) 99123-8877',
    totalOrders: 2,
    totalSpent: 2650.00,
    lastOrderDate: new Date(Date.now() - 86400000 * 5).toISOString(),
    role: 'cliente'
  },
  {
    id: 'usr_isabelle_fontaine',
    name: 'Isabelle Fontaine',
    email: 'isabelle.fontaine@studio-rive.com',
    phone: '+55 (48) 99988-1122',
    totalOrders: 4,
    totalSpent: 6240.00,
    lastOrderDate: new Date(Date.now() - 86400000 * 8).toISOString(),
    role: 'cliente'
  },
  {
    id: 'usr_camille_laurent',
    name: 'Camille Laurent',
    email: 'camille.laurent@rivegauche.paris',
    phone: '+55 (19) 98877-6655',
    totalOrders: 1,
    totalSpent: 1480.00,
    lastOrderDate: new Date(Date.now() - 86400000 * 12).toISOString(),
    role: 'cliente'
  }
];

export const INITIAL_COLLECTIONS: CollectionItem[] = [
  {
    id: 'collection-automne-hiver-1986',
    name: 'Automne-Hiver 1986',
    description: 'A coleção seminal inspirada nos cafés do Boulevard Saint-Germain, nas folhas douradas do Jardin du Luxembourg e na estética French Ivy.',
    image: '/src/assets/images/hero_paris_1986_editorial_1790164814011.jpg',
    active: true
  },
  {
    id: 'collection-rive-gauche-essentials',
    name: 'Les Intemporels KVANORI',
    description: 'Silhuetas perenes de alfaiataria em tweed, popeline de algodão egípcio e tricô de lã merino pura.',
    image: '/src/assets/images/look_french_preppy_silhouette_1790164828265.jpg',
    active: true
  }
];

export const INITIAL_CATEGORIES: CategoryItem[] = CATEGORIES_LIST.map((c) => ({
  id: c.id,
  name: c.name,
  slug: c.id,
  image: c.image,
  count: c.count
}));

export const INITIAL_PRODUCTS: Product[] = PRODUCTS.map((p, idx) => ({
  id: p.id,
  name: p.name,
  slug: p.id,
  description: p.description,
  price: p.price,
  originalPrice: p.originalPrice,
  frenchSubtitle: p.frenchSubtitle,
  category: p.category,
  collection: idx % 2 === 0 ? 'Automne-Hiver 1986' : 'Les Intemporels KVANORI',
  sizes: p.sizes,
  colors: p.colors,
  images: p.images,
  stock: p.stockStatus === 'Últimas 2 peças' ? 2 : (12 + (idx * 3) % 15),
  featured: !!p.isBestseller,
  newArrival: !!p.isNew,
  createdAt: new Date(1986, 9, 15 - idx).toISOString(),
  story: p.story,
  composition: p.composition,
  care: p.care,
  details: p.details,
  stockStatus: p.stockStatus,
  isNew: p.isNew,
  isBestseller: p.isBestseller,
  completeLookIds: p.completeLookIds,
  styleNote: p.styleNote
}));

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord_1986_8801',
    userId: 'usr_catherine_deneuve',
    customerName: 'Catherine Moreau',
    customerEmail: 'catherine.moreau@paris-art.fr',
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        selectedColor: INITIAL_PRODUCTS[0].colors[0],
        selectedSize: '38',
        quantity: 1
      },
      {
        product: INITIAL_PRODUCTS[23],
        selectedColor: INITIAL_PRODUCTS[23].colors[0],
        selectedSize: 'U',
        quantity: 1
      }
    ],
    subtotal: 1870.00,
    shipping: 0,
    total: 1870.00,
    status: 'Preparando',
    paymentStatus: 'aprovado',
    shippingAddress: {
      street: 'Boulevard Saint-Germain',
      number: '142',
      complement: 'Apt 4B',
      neighborhood: 'Saint-Germain-des-Prés',
      city: 'São Paulo',
      state: 'SP',
      zip: '01414-001',
      country: 'Brasil'
    },
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 'ord_1986_8802',
    userId: 'usr_helene_girard',
    customerName: 'Hélène Girard',
    customerEmail: 'helene.girard@sorbonne.fr',
    items: [
      {
        product: INITIAL_PRODUCTS[4],
        selectedColor: INITIAL_PRODUCTS[4].colors[0],
        selectedSize: 'M',
        quantity: 1
      }
    ],
    subtotal: 960.00,
    shipping: 45.00,
    total: 1005.00,
    status: 'Pagamento aprovado',
    paymentStatus: 'aprovado',
    shippingAddress: {
      street: 'Rua Oscar Freire',
      number: '920',
      complement: 'Bloco A',
      neighborhood: 'Cerqueira César',
      city: 'São Paulo',
      state: 'SP',
      zip: '01426-000',
      country: 'Brasil'
    },
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString()
  },
  {
    id: 'ord_1986_8803',
    userId: 'usr_isabelle_fontaine',
    customerName: 'Isabelle Fontaine',
    customerEmail: 'isabelle.fontaine@studio-rive.com',
    items: [
      {
        product: INITIAL_PRODUCTS[1],
        selectedColor: INITIAL_PRODUCTS[1].colors[0],
        selectedSize: '36',
        quantity: 1
      }
    ],
    subtotal: 1390.00,
    shipping: 0,
    total: 1390.00,
    status: 'Enviado',
    paymentStatus: 'aprovado',
    shippingAddress: {
      street: 'Avenida Atlântica',
      number: '2100',
      complement: 'Cobertura',
      neighborhood: 'Copacabana',
      city: 'Rio de Janeiro',
      state: 'RJ',
      zip: '22021-001',
      country: 'Brasil'
    },
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'ord_1986_8804',
    userId: 'usr_camille_laurent',
    customerName: 'Camille Laurent',
    customerEmail: 'camille.laurent@rivegauche.paris',
    items: [
      {
        product: INITIAL_PRODUCTS[8],
        selectedColor: INITIAL_PRODUCTS[8].colors[0],
        selectedSize: '38',
        quantity: 1
      }
    ],
    subtotal: 680.00,
    shipping: 35.00,
    total: 715.00,
    status: 'Entregue',
    paymentStatus: 'aprovado',
    shippingAddress: {
      street: 'Rua das Laranjeiras',
      number: '450',
      neighborhood: 'Laranjeiras',
      city: 'Rio de Janeiro',
      state: 'RJ',
      zip: '22240-006',
      country: 'Brasil'
    },
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString()
  },
  {
    id: 'ord_1986_8805',
    userId: 'usr_catherine_deneuve',
    customerName: 'Catherine Moreau',
    customerEmail: 'catherine.moreau@paris-art.fr',
    items: [
      {
        product: INITIAL_PRODUCTS[15],
        selectedColor: INITIAL_PRODUCTS[15].colors[0],
        selectedSize: '38',
        quantity: 1
      }
    ],
    subtotal: 890.00,
    shipping: 0,
    total: 890.00,
    status: 'Pendente',
    paymentStatus: 'pendente',
    shippingAddress: {
      street: 'Boulevard Saint-Germain',
      number: '142',
      complement: 'Apt 4B',
      neighborhood: 'Saint-Germain-des-Prés',
      city: 'São Paulo',
      state: 'SP',
      zip: '01414-001',
      country: 'Brasil'
    },
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString()
  }
];

