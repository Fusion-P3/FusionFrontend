import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { CartDto, ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: {
    product: Product;
    quantity: number;
  }[] = [];
  totalPrice: number = 0;
  cartProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.productService.getCart(this.auth.userId).subscribe((cart) => {
      this.products = cart.products;
      this.products.forEach((element) =>
        this.cartProducts.push(element.product)
      );
      this.totalPrice = cart.totalPrice;
    });
  }

  emptyCart(): void {
    let cart: CartDto = {
      userId: this.auth.userId,
      cart: {
        cartCount: 0,
        products: [],
        totalPrice: 0.0,
      },
    };
    this.productService.setCart(cart).subscribe((cart) => {
      this.products = cart.cart.products;
      this.products.forEach((element) =>
        this.cartProducts.push(element.product)
      );
      this.totalPrice = cart.cart.totalPrice;
      this.router.navigate(['/home']);
    });
  }

  removeFromCart(id: number): any {
    this.products = this.products.filter((product) => product.product.id != id);

    let cart: CartDto = {
      userId: this.auth.userId,
      cart: {
        cartCount: this.products.length,
        products: this.products,
        totalPrice: this.products.reduce(
          (a, b) => a + b.product.price * b.quantity,
          0
        ),
      },
    };

    this.productService.setCart(cart).subscribe((cart) => {
      this.products = cart.cart.products;
      this.products.forEach((element) =>
        this.cartProducts.push(element.product)
      );
      this.totalPrice = cart.cart.totalPrice;
      
    });
  }
}
