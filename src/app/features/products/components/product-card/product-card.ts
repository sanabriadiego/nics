import { Component, input, output, computed } from '@angular/core';
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

  onToggleFavorite(): void {
    this.favorite.emit(this.product().id);
  }
}