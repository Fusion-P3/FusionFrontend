import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  const mockedRegistration: any = new UntypedFormGroup({
    fname: new UntypedFormControl(''),
    lname: new UntypedFormControl(''),
    uname: new UntypedFormControl('m'),
    lcname: new UntypedFormControl(''),
    password: new UntypedFormControl('')
  });
  let aserve: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule.withRoutes([{ path: 'login', component: RegisterComponent }])],
      declarations: [RegisterComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    aserve = TestBed.inject(AuthService);
    spyOn(aserve, 'register').and.returnValue(new Observable<any>(o => {
      o.next(0);
      o.complete();
    }));
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should contain a username', () => {
    expect(mockedRegistration).toBeTruthy();

    component.onSubmit();
    expect(component).toBeTruthy();
  });


});
