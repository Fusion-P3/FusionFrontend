import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InventoryDTO } from '../models/inventoryDTO';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  baseurl: string = `${environment.baseUrl}/api/Inventory/`;

  constructor(private http: HttpClient) {}

  getInventory(userId: string): Observable<InventoryDTO[]> {
    return this.http.get<InventoryDTO[]>(this.baseurl);
  }

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
