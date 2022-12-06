import { Component, OnInit } from '@angular/core';
import { InventoryDTO } from 'src/app/models/inventoryDTO';
import { InventoryService } from 'src/app/services/inventory.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  inventory: InventoryDTO[] = [];

  constructor(
    private inventoryService: InventoryService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    console.log(this.authService.userId);

    this.inventoryService.getInventory(this.authService.userId).subscribe({
      next: (res) => {
        this.inventory = res;
      },
      error: (err) => console.error(err),
    });
  }
}
