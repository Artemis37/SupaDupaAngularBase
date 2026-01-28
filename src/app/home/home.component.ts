import { Component, OnInit, AfterViewInit, ViewChild, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { VehicleService } from '../shared/services/vehicle.service';
import { AuthService } from '../shared/services/auth.service';
import { MessagingService } from '../shared/services/messaging.service';
import { Vehicle } from '../shared/models/vehicle';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
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
  searchText = '';
  pageNumber = 1;
  pageSize = 10;
  totalCount = 0;
  totalPages = 0;
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
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'type':
          return item.type;
        case 'createdAt':
          const date = new Date(item.createdAt);
          return isNaN(date.getTime()) ? 0 : date.getTime();
        default:
          return (item as unknown as Record<string, unknown>)[property] as string | number;
      }
    };
    if (this.dataSource.data.length > 0 && this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  loadVehicles(): void {
    this.loading = true;
    this.vehicleService
      .getVehicles({
        searchText: this.searchText || undefined,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      })
      .subscribe({
        next: (response) => {
          const data = response.data;
          if (response.success && data) {
            this.vehicles = data.items;
            this.dataSource.data = data.items;
            this.totalCount = data.totalCount;
            this.totalPages = data.totalPages;
            this.pageNumber = data.pageNumber;
            this.pageSize = data.pageSize;
            setTimeout(() => {
              if (this.sort && !this.dataSource.sort) {
                this.dataSource.sort = this.sort;
              }
            }, 100);
          } else {
            this.vehicles = [];
            this.dataSource.data = [];
            this.totalCount = 0;
            this.totalPages = 0;
          }
          this.loading = false;
        },
        error: (error) => {
          const message = error?.error?.message || 'Failed to load vehicles';
          this.messagingService.showError(message);
          this.loading = false;
        }
      });
  }

  onSearch(): void {
    this.pageNumber = 1;
    this.loadVehicles();
  }

  onPageChange(event: { pageIndex: number; pageSize: number }): void {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadVehicles();
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
