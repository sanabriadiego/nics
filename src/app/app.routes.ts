import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => 
        import('./features/home/pages/home-page/home-page')
            .then(m => m.HomePage)
    },
    {
        path: 'products',
        loadComponent: () =>
        import('./features/products/pages/products-page/products-page')
            .then(m => m.ProductsPageComponent)
    },
    {
        path: 'favorites',
        loadComponent: () =>
        import('./features/favorites/pages/favorites-page/favorites-page')
            .then(m => m.FavoritesPageComponent)
    },
    {
        path: 'contact',
        loadComponent: () =>
        import('./features/contact/pages/contact-page/contact-page')
            .then(m => m.ContactPage)
    }
];
