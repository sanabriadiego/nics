import { TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card';
import { Product } from '../../models/product';

describe('ProductCardComponent', () => {
  const product: Product = {
    id: 'bag-grecia', name: 'Grecia', category: 'Carteras',
    imageUrl: '/cover.jpeg', hoverImageUrl: '/alternate.jpeg'
  };
  function render(value: Product = product) {
    const fixture = TestBed.createComponent(ProductCardComponent);
    fixture.componentRef.setInput('product', value);
    fixture.detectChanges();
    return fixture;
  }
  it('hides missing details but displays explicit zeros', () => {
    const fixture = render();
    expect(fixture.nativeElement.querySelector('.product-card__footer')).toBeNull();
    expect(fixture.nativeElement.querySelector('.product-card__description')).toBeNull();
    fixture.componentRef.setInput('product', { ...product, price: 0, stock: 0 });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.product-card__price').textContent).toContain('0 Bs');
    expect(fixture.nativeElement.querySelector('.product-card__stock').textContent).toContain('Stock: 0');
  });
  it('enables the alternate only after loading and falls back on error', () => {
    const fixture = render();
    const wrapper: HTMLElement = fixture.nativeElement.querySelector('.product-card__image-wrapper');
    const alternate = wrapper.querySelector('img[aria-hidden]')!;
    expect(wrapper.classList.contains('product-card__image-wrapper--ready')).toBe(false);
    alternate.dispatchEvent(new Event('load'));
    fixture.detectChanges();
    expect(wrapper.classList.contains('product-card__image-wrapper--ready')).toBe(true);
    alternate.dispatchEvent(new Event('error'));
    fixture.detectChanges();
    expect(wrapper.classList.contains('product-card__image-wrapper--ready')).toBe(false);
  });
  it('keeps one image without an alternate and emits favorite IDs', () => {
    const fixture = render({ ...product, hoverImageUrl: undefined });
    expect(fixture.nativeElement.querySelectorAll('img').length).toBe(1);
    const listener = vi.fn();
    fixture.componentInstance.favorite.subscribe(listener);
    fixture.nativeElement.querySelector('button').click();
    expect(listener).toHaveBeenCalledWith('bag-grecia');
  });
});
