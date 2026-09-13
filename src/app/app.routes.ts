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
        redirectTo: 'catalog',
        pathMatch: 'full'
    },
    {
        path: 'catalog',
        loadComponent: () =>
        import('./features/catalog/pages/catalog-page/catalog-page')
            .then(m => m.CatalogPageComponent)
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
