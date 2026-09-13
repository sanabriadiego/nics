import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { CatalogPageComponent } from './catalog-page';
import { ProductRepository } from '../../repositories/product.repository';
import { ProductStore } from '../../store/product.store';
import { routes } from '../../../../app.routes';

describe('CatalogPageComponent', () => {
  const getProducts = vi.fn(() => of([
    { id: 'bag-grecia', name: 'Grecia', category: 'Carteras', imageUrl: '/grecia.jpeg' },
    { id: 'accessory-portagafas', name: 'Portagafas', category: 'Accesorios', imageUrl: '/portagafas.jpeg' }
  ]));
  beforeEach(() => {
    localStorage.clear();
    getProducts.mockClear();
    TestBed.configureTestingModule({
      providers: [provideRouter(routes), { provide: ProductRepository, useValue: { getProducts } }]
    });
  });
  it('redirects the legacy URL, resets state and lets users select accessories', async () => {
    const store = TestBed.inject(ProductStore);
    store.setSelectedCategory('Accesorios');
    store.setSearchTerm('old search');
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/products', CatalogPageComponent);
    expect(TestBed.inject(Router).url).toBe('/catalog');
    expect(store.selectedCategory()).toBe('Carteras');
    expect(store.searchTerm()).toBe('');
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toBe('Catálogo');
    const buttons = harness.routeNativeElement!.querySelectorAll<HTMLButtonElement>('[aria-pressed]');
    expect(buttons[0].getAttribute('aria-pressed')).toBe('true');
    buttons[1].click();
    harness.detectChanges();
    expect(buttons[1].getAttribute('aria-pressed')).toBe('true');
    expect(harness.routeNativeElement!.querySelector('app-product-card')!.textContent).toContain('Portagafas');
  });
  it('shows an error without an empty-result message', () => {
    getProducts.mockImplementationOnce(() => throwError(() => new Error('offline')));
    const fixture = TestBed.createComponent(CatalogPageComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('No se pudieron cargar');
    expect(fixture.nativeElement.textContent).not.toContain('No se encontraron');
  });
});
