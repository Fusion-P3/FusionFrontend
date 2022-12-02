import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { Cart, CartDto, ProductService } from 'src/app/services/product.service';
import { ProductDetailsComponent } from '../product-details/product-details.component';

import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let pservice: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([{ path: 'cart', component: ProductDetailsComponent }])],
      declarations: [ProductCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    pservice = TestBed.inject(ProductService);
    let cart: Cart = {
      cartCount: 0,
      products: [],
      totalPrice: 0
    };
    spyOn(pservice, 'getCart').and.returnValue(new Observable<Cart>(observer => {
      observer.next(cart);
      observer.complete();
    }));
    spyOn(pservice, 'setCart').and.callFake((dto) => {
      return new Observable<CartDto>(o => {
        o.next(dto);
        o.complete();
      });
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    let product: Product = {
      id: 0,
      name: 'test',
      quantity: 1,
      price: 0,
      description: '',
      image: ''
    }
    component.addToCart(product);
    component.addToCart(product);
    expect(component).toBeTruthy();
  });
});
