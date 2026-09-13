import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductCategory } from '../../models/product';

@Component({
  selector: 'app-product-filters',
  imports: [FormsModule],
  templateUrl: './product-filters.html',
  styleUrl: './product-filters.scss',
})
export class ProductFilters {
  searchTerm = input<string>('');
  selectedCategory = input<ProductCategory>('Carteras');
  categories = input<ProductCategory[]>([]);

  searchTermChange = output<string>();
  categoryChange = output<ProductCategory>();
  clearFilters = output<void>();

  onSearchTermChange(value: string): void {
    this.searchTermChange.emit(value);
  }

  onCategoryChange(value: ProductCategory): void {
    this.categoryChange.emit(value);
  }

  onClearFilters(): void {
    this.clearFilters.emit();
  }
}
