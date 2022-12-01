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

  constructor(private http: HttpClient) {}

  login(user: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${this.authUrl}/login`, user);
  }

  // Richard's login
  // login(email: string, password: string): Observable<any> {
  //   const payload = {email:email, password:password};
  //   return this.http.post<any>(`${this.authUrl}/login`, payload, {headers: environment.headers, withCredentials: environment.withCredentials});
  // }

  logout(): void {
    this.userId = '';
    this.loggedIn = false;
    //this.http.post(`${this.authUrl}/logout`, null);
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
