import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDTO } from '../models/userDTO';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getUserId(username: string): Observable<string> {
    return this.http.get(`${environment.baseUrl}/auth/${username}`, {
      responseType: 'text',
    });
  }

  authUrl: string = `${environment.baseUrl}/auth`;
  loggedIn: boolean = false;
  userId: string = '';
  username: string = '';

  constructor(private http: HttpClient) {}

  login(user: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${this.authUrl}/login`, user);
  }

  logout(): void {
    this.username = '';
    this.userId = '';
    this.loggedIn = false;
  }

  register(
    firstName: string,
    lastName: string,
    username: string,
    leetCodeName: string,
    password: string
  ): Observable<any> {
    const payload = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      leetCodeName: leetCodeName,
      password: password,
    };
    return this.http.post<any>(`${this.authUrl}/register`, payload, {
      headers: environment.headers,
    });
  }
}
