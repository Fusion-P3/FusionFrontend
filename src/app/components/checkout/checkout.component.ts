import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import {
  CheckoutDto,
  CheckoutService,
} from 'src/app/services/checkout.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  products: {
    product: Product;
    quantity: number;
  }[] = [];
  totalPrice: number = 0;
  cartProducts: Product[] = [];
  finalProducts: { id: number; quantity: number }[] = [];

  public salesFlag: boolean = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private checkoutService: CheckoutService,
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

  onSubmit(): void {
    //search cart for iron
    this.cartProducts.forEach((element) => {
      if (element.name == 'Iron') {
        this.checkoutService.salesFlag = true;
      }
    });
    let checkoutDto: CheckoutDto = {
      user_id: this.auth.userId,
    };
    this.checkoutService.checkout(checkoutDto).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/home']);
      },
      error: (err) => console.error(err),
    });
  }
}
