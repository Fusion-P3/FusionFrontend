import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InventoryDTO } from 'src/app/models/inventoryDTO';
import { InventoryService } from 'src/app/services/inventory.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  inventory: InventoryDTO[] = [];
  cartCount!: number;
  totalPrice!: number;
  subscription!: Subscription;
  totalHydrogen!: number;


  constructor(private authService: AuthService, private router: Router, private productService: ProductService, private inventoryService: InventoryService) { }

  ngOnInit(): void {

    this.inventoryService.getInventory(this.authService.userId).subscribe((res) => {
res.forEach(x => { 
  if(x.productName == 'Hydrogen') {
    this.totalHydrogen = x.quantity
  }

})
    })

    this.subscription = this.productService.getCart(this.authService.userId).subscribe(
      (cart) => this.cartCount = cart.cartCount
    );

    this.subscription = this.productService.getCart(this.authService.userId).subscribe(
      (cart) => this.totalPrice = cart.products.reduce(
        (a, b) => a + b.product.price * b.quantity,
        0
      )
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
