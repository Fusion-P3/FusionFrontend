import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private productService: ProductService, private wikiService: WikiService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    let productname = this.route.snapshot.paramMap.get('productname')!
    this.productService.getSingleProduct(productname).subscribe({
      next: (res) => {
        this.product = res;
        this.wikiService.getSummary(productname).subscribe({
          next: res => this.product.description = res.extract
        });
      }
    });
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
