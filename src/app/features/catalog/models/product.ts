export type ProductCategory = 'Carteras' | 'Accesorios';

export interface Product {
  id: string;
  name: string;
  description?: string;
  price?: number;
  imageUrl: string;
  hoverImageUrl?: string;
  category: ProductCategory;
  material?: string;
  stock?: number;
  isFeatured?: boolean;
}
