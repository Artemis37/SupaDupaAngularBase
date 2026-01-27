import { Component, OnInit, AfterViewInit, ViewChild, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VehicleService } from '../shared/services/vehicle.service';
import { AuthService } from '../shared/services/auth.service';
import { MessagingService } from '../shared/services/messaging.service';
import { Vehicle } from '../shared/models/vehicle';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  vehicles: Vehicle[] = [];
  dataSource = new MatTableDataSource<Vehicle>([]);
  displayedColumns: string[] = ['id', 'licensePlate', 'type', 'personId', 'createdAt'];
  loading = false;
  private readonly platformId = inject(PLATFORM_ID);

  constructor(
    private vehicleService: VehicleService,
    private authService: AuthService,
    private router: Router,
    private messagingService: MessagingService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadVehicles();
    }
  }

  ngAfterViewInit(): void {
    // Custom sort for type column to sort by the numeric value
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'type':
          return item.type; // Sort by numeric type value
        case 'createdAt':
          const date = new Date(item.createdAt);
          return isNaN(date.getTime()) ? 0 : date.getTime(); // Sort by timestamp, handle invalid dates
        default:
          return (item as any)[property];
      }
    };
    // Try to connect sort if data is already loaded
    if (this.dataSource.data.length > 0 && this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  loadVehicles(): void {
    this.loading = true;
    this.vehicleService.getVehicles().subscribe({
      next: (data) => {
        this.vehicles = data;
        this.dataSource.data = data;
        // Connect sort after data is loaded and table is rendered
        // Use a longer timeout to ensure the table is fully rendered
        setTimeout(() => {
          if (this.sort && !this.dataSource.sort) {
            this.dataSource.sort = this.sort;
          }
        }, 100);
        this.loading = false;
      },
      error: (error) => {
        const message = error?.error?.message || 'Failed to load vehicles';
        this.messagingService.showError(message);
        this.loading = false;
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getVehicleTypeName(type: number): string {
    switch (type) {
      case 0:
        return 'Motorcycle';
      case 1:
        return 'Car';
      default:
        return 'Unknown';
    }
  }
}
