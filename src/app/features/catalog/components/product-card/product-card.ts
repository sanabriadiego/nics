import { Component, input, output, signal } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCardComponent {
  product = input.required<Product>();
  isFavorite = input<boolean>(false);

  favorite = output<string>();
  readonly loadedHoverUrl = signal<string | null>(null);

  onToggleFavorite(): void {
    this.favorite.emit(this.product().id);
  }
}
