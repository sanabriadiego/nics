import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProductStore } from './product.store';
import { ProductRepository } from '../repositories/product.repository';
import { Product } from '../models/product';

describe('ProductStore', () => {
  const products: Product[] = [
    { id: 'v', name: 'Vicky', category: 'Carteras', imageUrl: '/v.jpeg' },
    { id: 'g', name: 'Grecia', category: 'Carteras', imageUrl: '/g.jpeg', description: 'Artesanal' },
    { id: 'p', name: 'Portagafas', category: 'Accesorios', imageUrl: '/p.jpeg' }
  ];
  let store: ProductStore;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [
      { provide: ProductRepository, useValue: { getProducts: () => of(products) } }
    ] });
    store = TestBed.inject(ProductStore);
    store.loadProducts();
  });
  it('defaults to bags, sorts alphabetically and defaults featured to false', () => {
    expect(store.selectedCategory()).toBe('Carteras');
    expect(store.filteredProducts().map(p => p.name)).toEqual(['Grecia', 'Vicky']);
    expect(store.products().every(p => p.isFeatured === false)).toBe(true);
  });
  it('searches names and optional descriptions', () => {
    store.setSearchTerm(' VIC ');
    expect(store.filteredProducts().map(p => p.id)).toEqual(['v']);
    store.setSearchTerm('artesanal');
    expect(store.filteredProducts().map(p => p.id)).toEqual(['g']);
  });
  it('resets search on category change and retains category when clearing search', () => {
    store.setSearchTerm('Grecia');
    store.setSelectedCategory('Accesorios');
    expect(store.searchTerm()).toBe('');
    expect(store.filteredProducts().map(p => p.name)).toEqual(['Portagafas']);
    store.setSearchTerm('missing');
    expect(store.filteredProducts()).toEqual([]);
    store.clearFilters();
    expect(store.selectedCategory()).toBe('Accesorios');
    expect(store.filteredProducts().length).toBe(1);
  });
});
