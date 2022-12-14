import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import {
  Cart,
  CartDto,
  ProductService,
} from 'src/app/services/product.service';
import { NavbarComponent } from '../navbar/navbar.component';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let pservice: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'home', component: CartComponent },
        ]),
      ],
      declarations: [CartComponent, NavbarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    pservice = TestBed.inject(ProductService);
    let cart: Cart = {
      cartCount: 0,
      products: [],
      totalPrice: 0,
    };
    spyOn(pservice, 'getCart').and.returnValue(
      new Observable<Cart>((observer) => {
        observer.next(cart);
        observer.complete();
      })
    );
    spyOn(pservice, 'setCart').and.callFake((dto) => {
      return new Observable<CartDto>((o) => {
        o.next(dto);
        o.complete();
      });
    });
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.emptyCart();
    expect(component).toBeTruthy();
    component.removeFromCart(1);
    expect(component).toBeTruthy();
  });
});
