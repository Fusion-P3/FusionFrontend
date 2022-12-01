import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  baseurl: string = `${environment.baseUrl}/Inventory/`;

  constructor(private http: HttpClient) {}

  createInventoryItem(
    userId: string,
    productId: string,
    quantity: number
  ): Observable<any> {
    return this.http.post(
      this.baseurl + userId + '/create/' + productId,
      quantity
    );
  }

  updateInventoryItem(
    userId: string,
    productId: string,
    diff: number
  ): Observable<any> {
    return this.http.put(this.baseurl + userId + '/update/' + productId, diff);
  }
}
