import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteStore {
  private readonly storageKey = 'favorite-products';

  private readonly favoriteIdsSignal = signal<string[]>(this.getInitialFavorites());

  readonly favoriteIds = this.favoriteIdsSignal.asReadonly();

  readonly totalFavorites = computed(() => this.favoriteIds().length);

  isFavorite(productId: string): boolean {
    return this.favoriteIds().includes(productId);
  }

  toggleFavorite(productId: string): void {
    const currentFavorites = this.favoriteIds();

    const updatedFavorites = currentFavorites.includes(productId)
      ? currentFavorites.filter(id => id !== productId)
      : [...currentFavorites, productId];

    this.favoriteIdsSignal.set(updatedFavorites);
    this.saveToLocalStorage(updatedFavorites);
  }

  private getInitialFavorites(): string[] {
    const storedFavorites = localStorage.getItem(this.storageKey);

    if (!storedFavorites) {
      return [];
    }

    return JSON.parse(storedFavorites);
  }

  private saveToLocalStorage(favoriteIds: string[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(favoriteIds));
  }
}