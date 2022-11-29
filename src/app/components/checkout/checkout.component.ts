import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CheckoutDto, CheckoutService } from 'src/app/services/checkout.service';

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

  constructor(private productService: ProductService, private router: Router, private checkoutService: CheckoutService) { }

  ngOnInit(): void {
    this.productService.getCart().subscribe(
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
    //  This is hardwired for user Duncan! When we get having a logged in user pass a better user id
    let checkoutDto: CheckoutDto = {
      user_id: "0df56b6a-26dd-47fe-81a2-e8297afd41be"
    }
    this.checkoutService.checkout(checkoutDto).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/home']);
      },
      error: (err) => console.error(err)
    })
  }

  // onSubmit(): void {
  //   this.products.forEach(
  //     (element) => {
  //       const id = element.product.id;
  //       const quantity = element.quantity
  //       this.finalProducts.push({id, quantity})
  //     } 
  //   );

  //   if(this.finalProducts.length > 0) {
  //     this.productService.purchase(this.finalProducts).subscribe(
  //       (resp) => console.log(resp),
  //       (err) => console.log(err),
  //       () => {
  //         let cart = {
  //           cartCount: 0,
  //           products: [],
  //           totalPrice: 0.00
  //         };
  //         this.productService.setCart(cart);
  //         this.router.navigate(['/home']);
  //       } 
  //     );

  //   } else {
  //     this.router.navigate(['/home']);
  //   }
  // }

}
