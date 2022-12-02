import { HttpClientTestingModule } from '@angular/common/http/testing';
import { identifierName } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Product } from 'src/app/models/product';
import { NavbarComponent } from '../navbar/navbar.component';

import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  const mockedProducts: Product[] = [new Product(0, "Iron", 0, "test", 0, "test")];
  let salesFlag:boolean=false;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [CheckoutComponent, NavbarComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit', () => {
    component.onSubmit();
    expect(component).toBeTruthy();
  });

  it('should be falsy', () => {
    component.cartProducts.push({
      name:"Iron",
      id: 0,
      quantity: 0,
      price: 0,
      description: "",
      image: ""
    })
    component.onSubmit();
    expect(component).toBeTruthy();
  });
});
