import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';

import { ProductDetailsComponent } from './product-details.component';
import { Observable } from 'rxjs';
import { WikiService } from 'src/app/services/wiki.service';
import { IWikiResponse } from 'src/app/models/IWikiResponse';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let productService: ProductService;
  let testProd = new Product(1, 'test', 10, 'test', 1, 'test');
  let activatedRoute: ActivatedRoute;
  let wikiService: WikiService;
  let wikiResponse: IWikiResponse = {
    type: '',
    title: 'Hydrogen',
    displaytitle: '',
  namespace: {
      id: 0,
      text: '',
  },
  wikibase_item: '',
  titles: {
      canonical: '',
      normalized: '',
      display: '',
  },
  pageid: 0,
  thumbnail: {
      source: '',
      width: 0,
      height: 0,
  },
  originalimage: {
      source: '',
      width: 0,
      height: 0,
  },
  lang: '',
  dir: '',
  revision: '',
  tid: '',
  timestamp: '',
  description: '',
  description_source: '',
  content_urls: {
      desktop: {
          page: '',
          revisions: '',
          edit: '',
          talk: '',
      },
      mobile: {
          page: '',
          revisions: '',
          edit: '',
          talk: '',
      }
  },
  extract: 'hello',
  extract_html: '',
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailsComponent, NavbarComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule, FormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailsComponent);
    productService = TestBed.inject(ProductService);
    wikiService = TestBed.inject(WikiService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the current product with wiki description', () => {
    spyOn(productService, 'getSingleProduct').and.returnValue(
      new Observable( observer => {
        observer.next(testProd);
        observer.complete();
      })
    );

    spyOn(wikiService, 'getSummary').and.returnValue(
      new Observable (o => {
        o.next(wikiResponse);
      })
    );

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.product).toEqual(testProd);
    expect(component.fullDescription).toEqual("hello");
  });

  it('addToCart() should update the cart', () => {

    component.addToCart(testProd);
    expect(component.cartCount).toEqual(1);
    component.addToCart(testProd);
    expect(component.cartCount).toEqual(1);
  })
});
