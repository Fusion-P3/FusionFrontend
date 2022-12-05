import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { UserDTO } from 'src/app/models/userDTO';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'register', component: LoginComponent },
          { path: 'home', component: LoginComponent },
        ]),
      ],
      declarations: [LoginComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update loggedIn', () => {
    let mockedRes: UserDTO = {
      username: 'test',
      password: 'test',
    };

    spyOn(authService, 'login').and.returnValue(
      new Observable<UserDTO>((o) => {
        o.next(mockedRes);
      })
    );

    spyOn(authService, 'getUserId').and.returnValue(
      new Observable<string>((o) => {
        o.next('9');
        o.complete();
      })
    );

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    component.loginForm.controls['username'].setValue('test');
    component.loginForm.controls['password'].setValue('test');
    component.onSubmit();

    component.register();

    fixture.detectChanges();
    expect(authService.loggedIn).toBeTrue();
  });
});
