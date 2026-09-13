import { computed, inject, Injectable, signal } from '@angular/core';
import { ProductRepository } from '../repositories/product.repository';
import { Product, ProductCategory } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductStore {
  private readonly productRepository = inject(ProductRepository);

  private readonly productsSignal = signal<Product[]>([]);
  private readonly loadingSignal = signal(false);
  private readonly errorSignal = signal<string | null>(null);

  private readonly searchTermSignal = signal('');
  private readonly selectedCategorySignal = signal<ProductCategory>('Carteras');

  readonly products = this.productsSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  readonly searchTerm = this.searchTermSignal.asReadonly();
  readonly selectedCategory = this.selectedCategorySignal.asReadonly();

  readonly categories: ProductCategory[] = ['Carteras', 'Accesorios'];

  readonly filteredProducts = computed(() => {
    const searchTerm = this.searchTerm().toLowerCase().trim();
    const selectedCategory = this.selectedCategory();

    return this.products().filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm) ||
        (product.description ?? '').toLowerCase().includes(searchTerm);

      const matchesCategory =
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    }).sort((a, b) => a.name.localeCompare(b.name, 'es'));
  });

  loadProducts(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.productRepository.getProducts().subscribe({
      next: products => {
        this.productsSignal.set(products.map(product => ({ ...product, isFeatured: product.isFeatured ?? false })));
        this.loadingSignal.set(false);
      },
      error: () => {
        this.errorSignal.set('No se pudieron cargar los productos.');
        this.loadingSignal.set(false);
      }
    });
  }

  setSearchTerm(searchTerm: string): void {
    this.searchTermSignal.set(searchTerm);
  }

  setSelectedCategory(category: ProductCategory): void {
    this.selectedCategorySignal.set(category);
    this.clearFilters();
  }

  clearFilters(): void {
    this.searchTermSignal.set('');
  }
}
