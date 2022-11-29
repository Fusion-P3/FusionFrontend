import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { userDTO } from '../components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl: string = `${environment.baseUrl}/auth`;
  loggedIn: boolean = false;
  // TODO: Hardwired for duncan
  userId: string = "0df56b6a-26dd-47fe-81a2-e8297afd41be";

  constructor(private http: HttpClient) { }

  login(user: userDTO): Observable<userDTO> {
    return this.http.post<userDTO>(`${this.authUrl}/login`, user);
  }

  // Richard's login
  // login(email: string, password: string): Observable<any> {
  //   const payload = {email:email, password:password};
  //   return this.http.post<any>(`${this.authUrl}/login`, payload, {headers: environment.headers, withCredentials: environment.withCredentials});
  // }

  logout(): void {
    this.http.post(`${this.authUrl}/logout`, null);
  }

  register(firstName: string, lastName: string, username: string, leetCodeName: string, password: string): Observable<any> {
    const payload = { firstName: firstName, lastName: lastName, username: username, leetCodeName: leetCodeName, password: password };
    return this.http.post<any>(`${this.authUrl}/register`, payload, { headers: environment.headers });
  }
}
