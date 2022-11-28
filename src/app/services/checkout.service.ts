import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  checkoutUrl: string = `${environment.baseUrl}/checkout`;

  constructor(private client: HttpClient) { }

  checkout(checkout: CheckoutDto): Observable<CheckoutDto> {
    return this.client.post<CheckoutDto>(this.checkoutUrl, checkout);
  }
}

export interface CheckoutDto {
  user_id: string
}