import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IWikiResponse } from '../models/IWikiResponse';

@Injectable({
  providedIn: 'root',
})
export class WikiService {
  baseurl: string = 'https://en.wikipedia.org/api/rest_v1/page/summary/';

  constructor(private http: HttpClient) {}

  getSummary(productName: string) {
    let summary = '';
    return this.http.get<IWikiResponse>(this.baseurl + productName);
  }
}
