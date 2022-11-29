import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{

  public product: Product = new Product(0,'TEST',0,'',0,'');

  constructor(public route: ActivatedRoute, public productService: ProductService) { }

  ngOnInit(): void {
    let productname = this.route.snapshot.paramMap.get('productname')!
    this.productService.getSingleProduct(productname).subscribe({
      next: (res) => this.product = res
    });
  }

}
