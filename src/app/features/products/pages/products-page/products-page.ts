import { Component, inject, OnInit } from '@angular/core';
import { ProductStore } from '../../store/product.store';
import { ProductCardComponent } from '../../components/product-card/product-card';
import { FavoriteStore } from '../../../favorites/store/favorite.store/favorite.store';
import { ProductFilters } from '../../components/product-filters/product-filters';


@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [ProductCardComponent, ProductFilters],
  templateUrl: './products-page.html',
  styleUrl: './products-page.scss'
})
export class ProductsPageComponent implements OnInit {
  readonly productStore = inject(ProductStore);
  readonly favoriteStore = inject(FavoriteStore);

  ngOnInit(): void {
    this.productStore.loadProducts();
  }

  toggleFavorite(productId: string): void {
    this.favoriteStore.toggleFavorite(productId);
  }
}