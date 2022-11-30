import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { CartDto, ProductService } from 'src/app/services/product.service'
import { WikiService } from 'src/app/services/wiki.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  public product: Product = new Product(0, 'TEST', 0, '', 0, '');
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

  constructor(private route: ActivatedRoute, private productService: ProductService, private wikiService: WikiService, private cdr: ChangeDetectorRef, private auth: AuthService) { }

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
    this.subscription = this.productService.getCart(this.auth.userId).subscribe((cart) => {
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
        let cart: CartDto = {
          userId: this.auth.userId,
          cart: {
            cartCount: this.cartCount,
            products: this.products,
            totalPrice: this.totalPrice + product.price
          }
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
      let cart: CartDto = {
        userId: this.auth.userId,
        cart: {
          cartCount: this.cartCount,
          products: this.products,
          totalPrice: this.totalPrice + product.price
        }
      };
      this.productService.setCart(cart);
    }
  }

}

