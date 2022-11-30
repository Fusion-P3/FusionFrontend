import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth.service';
import { from, Observable, of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
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
    let mockedRes: userDTO = {
      username: 'test',
      password: 'test',
    };

    spyOn(authService, 'login').and.returnValue(
      new Observable<userDTO>((o) => {
        o.next(mockedRes);
      })
    );

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    component.loginForm.controls['username'].setValue('test');
    component.loginForm.controls['password'].setValue('test');
    component.onSubmit();

    fixture.detectChanges();
    expect(authService.loggedIn).toBeTrue();
  });
});
export interface userDTO {
  username: string;
  password: string;
}
