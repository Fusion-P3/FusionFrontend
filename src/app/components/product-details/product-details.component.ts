import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service'
import { WikiService } from 'src/app/services/wiki.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{

  public product: Product = new Product(0,'TEST',0,'',0,'');
  fullDescription: string = '';
  cartCount!: number;
  products: {
    product: Product;
    quantity: number;
  }[] = [];
  subscription!: Subscription;
  totalPrice: number = 0;
  quantitySelect: number = 0;

  @Input() productInfo!: Product;

  constructor(private route: ActivatedRoute, private productService: ProductService, private wikiService: WikiService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    let productname = this.route.snapshot.paramMap.get('productname')!
    this.productService.getSingleProduct(productname).subscribe({
      next: (res) => {
        this.product = res;
        this.wikiService.getSummary(productname).subscribe({
          next: res => this.fullDescription = res.extract
        });
      }
    });
    this.subscription = this.productService.getCart().subscribe((cart) => {
      this.cartCount = cart.cartCount;
      this.products = cart.products;
      this.totalPrice = cart.totalPrice;
    });
  }
  
  addToCart(product: Product): void {
    let inCart = false;

    this.products.forEach((element) => {
      if (element.product.name == product.name) {
        element.quantity += this.quantitySelect;
        let cart = {
          cartCount: this.cartCount,
          products: this.products,
          totalPrice: this.totalPrice + product.price,
        };
        this.productService.setCart(cart);
        inCart = true;
      }
    });

    if (!inCart) {
      let newProduct = {
        product: product,
        quantity: this.quantitySelect,
      };
      this.products.push(newProduct);
      let cart = {
        cartCount: this.cartCount + 1,
        products: this.products,
        totalPrice: this.totalPrice + product.price,
      };
      this.productService.setCart(cart);
    }
  }

}

interface IResult {
  type: string,
  title: string,
  displaytitle: string,
  namespace: {
      id: number,
      text: string,
  },
  wikibase_item: string,
  titles: {
      canonical: string,
      normalized: string,
      display: string,
  },
  pageid: number,
  thumbnail: {
      source: string,
      width: number,
      height: number,
  },
  originalimage: {
      source: string,
      width: number,
      height: number,
  },
  lang: string,
  dir: string,
  revision: string,
  tid: string,
  timestamp: string,
  description: string,
  description_source: string,
  content_urls: {
      desktop: {
          page: string,
          revisions: string,
          edit: string,
          talk: string,
      },
      mobile: {
          page: string,
          revisions: string,
          edit: string,
          talk: string,
      }
  },
  extract: string,
  extract_html: string,
}
