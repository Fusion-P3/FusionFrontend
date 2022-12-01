import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { CartDto, ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  cartCount!: number;
  products: {
    product: Product;
    quantity: number;
  }[] = [];
  subscription!: Subscription;
  totalPrice: number = 0;
  quantitySelect: number = 0;

  @Input() productInfo!: Product;
  displayName!:boolean;

  constructor(private productService: ProductService, private auth: AuthService) { }

  ngOnInit(): void {
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
            totalPrice: this.totalPrice + product.price,
          }
        };
        this.subscription = this.productService.setCart(cart).subscribe((cart) => {
          this.cartCount = cart.cart.cartCount;
          this.products = cart.cart.products;
          this.totalPrice = cart.cart.totalPrice;
        });
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
          cartCount: this.cartCount + 1,
          products: [newProduct],
          totalPrice: this.totalPrice + product.price,
        }
      };
      this.subscription = this.productService.setCart(cart).subscribe((cart) => {
        this.cartCount = cart.cart.cartCount;
        this.products = cart.cart.products;
        this.totalPrice = cart.cart.totalPrice;
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
