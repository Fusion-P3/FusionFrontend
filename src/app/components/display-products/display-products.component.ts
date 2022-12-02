import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { CheckoutComponent } from 'src/app/components/checkout/checkout.component';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.css'],
})
export class DisplayProductsComponent implements OnInit {
  allProducts: Product[] = [];



  constructor(private productService: ProductService, public sales:CheckoutComponent) {
  }


  ngOnInit(): void {

    if (this.sales?.salesFlag == true){
      this.productService.getSaleProducts().subscribe({
        next: (resp) => (this.allProducts = resp),
        error: (err) => console.log(err),
        complete: () => console.log('Products Retrieved'),
      });
    }
    else{
      this.productService.getProducts().subscribe({
        next: (resp) => (this.allProducts = resp),
        error: (err) => console.log(err),
        complete: () => console.log('Products Retrieved'),
      });
    }
      
  }
}
