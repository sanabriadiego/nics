import { Component, inject, OnInit } from '@angular/core';
import { ProductStore } from '../../store/product.store';
import { ProductCardComponent } from '../../components/product-card/product-card';
import { FavoriteStore } from '../../../favorites/store/favorite.store/favorite.store';
import { ProductFilters } from '../../components/product-filters/product-filters';


@Component({
  selector: 'app-catalog-page',
  standalone: true,
  imports: [ProductCardComponent, ProductFilters],
  templateUrl: './catalog-page.html',
  styleUrl: './catalog-page.scss'
})
export class CatalogPageComponent implements OnInit {
  readonly productStore = inject(ProductStore);
  readonly favoriteStore = inject(FavoriteStore);

  ngOnInit(): void {
    this.productStore.setSelectedCategory('Carteras');
    this.productStore.loadProducts();
  }

  toggleFavorite(productId: string): void {
    this.favoriteStore.toggleFavorite(productId);
  }
}
