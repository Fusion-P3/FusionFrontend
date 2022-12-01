import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LeetcodeService {
  baseurl: string = 'https://leetcode-stats-api.herokuapp.com/';

  constructor(private httpClient: HttpClient) {}

  getLeetcodeInfo(username: string): Observable<any> {
    return this.httpClient.get(this.baseurl + username);
  }
}
