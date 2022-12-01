import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';

export interface Cart {
  cartCount: number;
  products: {
    product: Product,
    quantity: number
  }[];
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl: string = "/api/product";
  private cartUrl: string = environment.baseUrl + '/api/cart'

  getCart(userId: string): Observable<Cart> {
    return this.http.get<Cart>(this.cartUrl + '/' + userId);
  }

  setCart(cart: CartDto): Observable<CartDto> {
    return this.http.put<CartDto>(this.cartUrl, cart);
  }

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.baseUrl + this.productUrl, { headers: environment.headers, withCredentials: environment.withCredentials });
  }

  public getSingleProduct(name: string): Observable<Product> {
    return this.http.get<Product>(environment.baseUrl + this.productUrl + '/' + name);
  }

  public purchase(products: { id: number, quantity: number }[]): Observable<any> {
    const payload = JSON.stringify(products);
    return this.http.patch<any>(environment.baseUrl + this.productUrl, payload, { headers: environment.headers, withCredentials: environment.withCredentials })
  }
}

export interface CartDto {
  userId: string,
  cart: Cart
}
