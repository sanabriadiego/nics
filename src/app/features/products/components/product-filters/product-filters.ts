import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-filters',
  imports: [FormsModule],
  templateUrl: './product-filters.html',
  styleUrl: './product-filters.scss',
})
export class ProductFilters {
  searchTerm = input<string>('');
  selectedCategory = input<string | null>(null);
  categories = input<string[]>([]);

  searchTermChange = output<string>();
  categoryChange = output<string | null>();
  clearFilters = output<void>();

  onSearchTermChange(value: string): void {
    this.searchTermChange.emit(value);
  }

  onCategoryChange(value: string): void {
    this.categoryChange.emit(value || null);
  }

  onClearFilters(): void {
    this.clearFilters.emit();
  }
}
