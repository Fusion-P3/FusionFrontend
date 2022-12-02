import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from '../navbar/navbar.component';
import { Product } from 'src/app/models/product';

import { DisplayProductsComponent } from './display-products.component';
import { ProductService } from 'src/app/services/product.service';
import { Observable } from 'rxjs';
import { CheckoutComponent } from '../checkout/checkout.component';

describe('DisplayProductsComponent', () => {
  let component: DisplayProductsComponent;
  let service: ProductService;
  let fixture: ComponentFixture<DisplayProductsComponent>;
  let allProducts: Product[] = [];
  let prod: Product[] = [new Product(0, "test", 0, "test", 0, "test")]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [DisplayProductsComponent, NavbarComponent, CheckoutComponent],
      providers: [CheckoutComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ProductService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create', () => {
    spyOn(service, "getSaleProducts").and.returnValue(
      new Observable<Product[]> (o => {
        o.next( prod);
        o.complete();
      })
    );
    fixture = TestBed.createComponent(DisplayProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.sales.salesFlag = true;
    component.ngOnInit();
    
    expect(component.allProducts).toEqual(prod);
  });

});
