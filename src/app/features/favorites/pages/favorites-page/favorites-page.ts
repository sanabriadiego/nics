import { Component, computed, inject, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../../products/components/product-card/product-card';
import { ProductStore } from '../../../products/store/product.store';
import { FavoriteStore } from '../../store/favorite.store/favorite.store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [ProductCardComponent, RouterLink],
  templateUrl: './favorites-page.html',
  styleUrl: './favorites-page.scss'
})
export class FavoritesPageComponent implements OnInit {
  readonly productStore = inject(ProductStore);
  readonly favoriteStore = inject(FavoriteStore);

  readonly favoriteProducts = computed(() =>
    this.productStore.products()
      .filter(product => this.favoriteStore.isFavorite(product.id))
  );

  ngOnInit(): void {
    this.productStore.loadProducts();
  }

  toggleFavorite(productId: string): void {
    this.favoriteStore.toggleFavorite(productId);
  }
}