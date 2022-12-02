import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CheckoutDto, CheckoutService } from 'src/app/services/checkout.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  products: {
    product: Product,
    quantity: number
  }[] = [];
  totalPrice!: number;
  cartProducts: Product[] = [];
  finalProducts: { id: number, quantity: number }[] = [];

  checkoutForm = new UntypedFormGroup({
    fname: new UntypedFormControl('', Validators.required),
    lname: new UntypedFormControl('', Validators.required),
    cardName: new UntypedFormControl('', Validators.required),
    detail: new UntypedFormControl('', Validators.required),
    addOne: new UntypedFormControl('', Validators.required),
    addTwo: new UntypedFormControl(''),
    city: new UntypedFormControl('', Validators.required),
    state: new UntypedFormControl('', Validators.required),
    zipCode: new UntypedFormControl('', Validators.required),
    country: new UntypedFormControl('', Validators.required)
  });

  public salesFlag:boolean=false;

  constructor(private productService: ProductService, private router: Router, private checkoutService: CheckoutService, private auth: AuthService) { }

  ngOnInit(): void {
    this.productService.getCart(this.auth.userId).subscribe(
      (cart) => {
        this.products = cart.products;
        this.products.forEach(
          (element) => this.cartProducts.push(element.product)
        );
        this.totalPrice = cart.totalPrice;
      }
    );
  }

  onSubmit(): void {
    //search cart for iron
    this.cartProducts.forEach(element => {
      if(element.name = "Iron"){
        this.salesFlag = true;
      }
    });
    let checkoutDto: CheckoutDto = {
      user_id: this.auth.userId
    }
    this.checkoutService.checkout(checkoutDto).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/home']);
      },
      error: (err) => console.error(err)
    })
  }
}
