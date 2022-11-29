import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let service: ProductService;
  let testProd = new Product(1, 'test', 10, 'test', 1, 'test');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ProductCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    service = TestBed.inject(ProductService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update cart when product/quantity is added', () => {
    component.addToCart(testProd);
    expect(component.cartCount == 1);
    component.addToCart(testProd);
    expect(component.cartCount == 1);
    service.getCart().subscribe((cart) => {
      expect(cart.cartCount == 1);
      expect(cart.products[0].quantity == 2);
      expect(cart.products[0].product == testProd);
    });
  });
});
