import { computed, inject, Injectable, signal } from '@angular/core';
import { ProductRepository } from '../repositories/product.repository';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductStore {
  private readonly productRepository = inject(ProductRepository);

  private readonly productsSignal = signal<Product[]>([]);
  private readonly loadingSignal = signal(false);
  private readonly errorSignal = signal<string | null>(null);

  readonly products = this.productsSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  readonly featuredProducts = computed(() =>
    this.products().filter(product => product.isFeatured)
  );

  loadProducts(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.productRepository.getProducts().subscribe({
      next: products => {
        this.productsSignal.set(products);
        this.loadingSignal.set(false);
      },
      error: () => {
        this.errorSignal.set('No se pudieron cargar los productos.');
        this.loadingSignal.set(false);
      }
    });
  }
}