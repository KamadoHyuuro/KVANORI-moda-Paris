export type Category = 
  | 'Blazers'
  | 'Cardigans & Suéteres'
  | 'Camisas'
  | 'Saias'
  | 'Vestidos'
  | 'Casacos'
  | 'Boinas'
  | 'Lenços'
  | 'Bolsas'
  | string;

export interface ProductColor {
  name: string;
  hex: string;
  border?: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug?: string;
  description: string;
  price: number;
  category: Category;
  collection?: string;
  sizes: string[];
  colors: ProductColor[];
  images: string[];
  stock?: number;
  featured?: boolean;
  newArrival?: boolean;
  active?: boolean;
  createdAt?: string;

  // Rich Editorial Attributes (KVANORI Heritage)
  frenchSubtitle?: string;
  originalPrice?: number;
  story?: string;
  composition?: string;
  care?: string;
  details?: string[];
  stockStatus?: 'Em estoque' | 'Últimas 2 peças' | 'Edição Limitada';
  isNew?: boolean;
  isBestseller?: boolean;
  completeLookIds?: string[];
  styleNote?: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
  count?: number;
  active?: boolean;
}

export interface CollectionItem {
  id: string;
  name: string;
  description: string;
  image: string;
  active: boolean;
  season?: string;
}

export interface BannerItem {
  id: string;
  title: string;
  subtitle: string;
  kicker?: string;
  description?: string;
  image: string;
  buttonText: string;
  link: string;
  active: boolean;
  order?: number;
}

export type UserRole = 'cliente' | 'administrador' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  phone?: string;
  totalOrders?: number;
  totalSpent?: number;
}

export interface CustomerData {
  id: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string;
  role: UserRole;
  phone?: string;
}

export interface ShippingAddress {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export type OrderStatus = 
  | 'Pendente' 
  | 'Pagamento aprovado' 
  | 'Preparando' 
  | 'Enviado' 
  | 'Entregue' 
  | 'Cancelado'
  | 'pendente'
  | 'em_processamento'
  | 'processando'
  | 'enviado'
  | 'entregue'
  | 'cancelado';

export type PaymentStatus = 'pendente' | 'aprovado' | 'recusado';

export interface Order {
  id: string;
  userId: string;
  customerName?: string;
  customerEmail?: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  shippingAddress: ShippingAddress;
  createdAt: string;
}

export interface CartData {
  id: string;
  userId: string;
  items: CartItem[];
}

export interface CartItem {
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
}

export interface LookSilhouette {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  description: string;
  image: string;
  productIds: string[];
  tags: string[];
}

export type SortOption = 'recentes' | 'bestsellers' | 'menor-preco' | 'maior-preco';

export interface FilterState {
  category: Category | 'Todos';
  size: string;
  color: string;
  maxPrice: number;
  searchQuery: string;
  sortBy: SortOption;
}
