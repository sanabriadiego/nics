import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { FavoritesPageComponent } from './favorites-page';
import { ProductRepository } from '../../../catalog/repositories/product.repository';
import { FavoriteStore } from '../../store/favorite.store/favorite.store';

describe('FavoritesPageComponent', () => {
  beforeEach(() => {
    localStorage.setItem('favorite-products', JSON.stringify(['bag-001']));
    TestBed.configureTestingModule({ providers: [
      provideRouter([]),
      { provide: ProductRepository, useValue: { getProducts: () => of([
        { id: 'bag-001', name: 'Petunia Bag', category: 'Carteras', imageUrl: '/petunia.jpeg' },
        { id: 'accessory-portagafas', name: 'Portagafas', category: 'Accesorios', imageUrl: '/portagafas.jpeg' }
      ]) } }
    ] });
  });
  afterEach(() => localStorage.clear());
  it('preserves previous favorites and supports new accessories', () => {
    const fixture = TestBed.createComponent(FavoritesPageComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Petunia Bag');
    const store = TestBed.inject(FavoriteStore);
    store.toggleFavorite('accessory-portagafas');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('app-product-card').length).toBe(2);
    fixture.nativeElement.querySelector('.product-card__favorite').click();
    fixture.detectChanges();
    expect(store.isFavorite('bag-001')).toBe(false);
    expect(JSON.parse(localStorage.getItem('favorite-products')!)).toEqual(['accessory-portagafas']);
  });
});
