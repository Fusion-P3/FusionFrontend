import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.css'],
})
export class DisplayProductsComponent implements OnInit {
  allProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (resp) => {(this.allProducts = resp); this.allProducts.sort((a, b) => a == b ? 0 : (a.price > b.price ? 1 : -1)

      );},
      error: (err) => console.log(err),
      complete: () => console.log('Products Retrieved'),
    });
  }
}


