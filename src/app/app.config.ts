import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { JsonProductRepository } from './features/products/repositories/json-product.repository';
import { ProductRepository } from './features/products/repositories/product.repository';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: ProductRepository,
      useClass: JsonProductRepository
    }
  ]
};
