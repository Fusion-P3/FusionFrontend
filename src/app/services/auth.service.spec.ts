import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UserDTO } from '../models/userDTO';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    service.logout();
    expect(service).toBeTruthy();
  });

  it('should login', () => {
    let dto: UserDTO = {
      username: 'test ',
      password: 'password',
    };

    service.login(dto).subscribe((response) => {
      expect(response).toBe(dto);
    });
    const res = controller.expectOne('https://localhost:7078/auth/login');
    expect(res.request.method).toBe('POST');
    res.flush(dto);
  });

  it('should register', () => {
    service
      .register('test', 'test', 'test', 'test', 'test')
      .subscribe((response) => {
        expect(response).toBeTruthy();
      });
    const res = controller.expectOne('https://localhost:7078/auth/register');
    expect(res.request.method).toBe('POST');
    res.flush(true);
  });

  it('should logout', () => {
    service.logout();

    expect(service.userId).toBeFalsy();
    expect(service.loggedIn).toBeFalse();
  });
});
