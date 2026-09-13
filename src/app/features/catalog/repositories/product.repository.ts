import { Observable } from 'rxjs';
import { Product } from '../models/product';

export abstract class ProductRepository {
  abstract getProducts(): Observable<Product[]>;
}