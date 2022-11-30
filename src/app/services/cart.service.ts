import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { Cart, CartDto } from './product.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  cart: {
    product: Product;
    quantity: number;
  }[] = [];

  private cartUrl: string = environment.baseUrl + '/api/cart';

  constructor(private http: HttpClient) { }

  getCart(userId: string): Observable<Cart> {
    return this.http.get<Cart>(this.cartUrl + '/' + userId);
  }

  setCart(cart: CartDto): Observable<CartDto> {
    return this.http.put<CartDto>(this.cartUrl, cart);
  }
  
}
