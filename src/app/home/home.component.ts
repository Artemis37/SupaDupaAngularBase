import { Component, OnInit, AfterViewInit, ViewChild, PLATFORM_ID, inject, DestroyRef, NgZone } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { VehicleService } from '../shared/services/vehicle.service';
import { AuthService } from '../shared/services/auth.service';
import { MessagingService } from '../shared/services/messaging.service';
import { Vehicle } from '../shared/models/vehicle';
import { ConfirmDialogComponent } from '../shared/components/confirm-dialog/confirm-dialog.component';
import { VehicleFormDialogComponent } from '../shared/components/vehicle-form-dialog/vehicle-form-dialog.component';

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
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  vehicles: Vehicle[] = [];
  dataSource = new MatTableDataSource<Vehicle>([]);
  displayedColumns: string[] = ['id', 'licensePlate', 'type', 'personId', 'createdAt', 'actions'];
  loading = false;
  searchText = '';
  pageNumber = 1;
  pageSize = 10;
  totalCount = 0;
  totalPages = 0;
  private readonly platformId = inject(PLATFORM_ID);
  private readonly search$ = new Subject<void>();
  private readonly destroyRef = inject(DestroyRef);
  private readonly ngZone = inject(NgZone);
  private readonly dialog = inject(MatDialog);

  constructor(
    private vehicleService: VehicleService,
    private authService: AuthService,
    private router: Router,
    private messagingService: MessagingService
  ) {}

  ngOnInit(): void {
    this.search$
      .pipe(debounceTime(500), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.onSearch());
    if (isPlatformBrowser(this.platformId)) {
      this.loadVehicles();
    }
  }

  onSearchInput(): void {
    this.search$.next();
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

  openCreateDialog(): void {
    const ref = this.dialog.open(VehicleFormDialogComponent, {
      width: '400px',
      data: { vehicle: null }
    });
    ref.afterClosed().subscribe((payload) => {
      if (payload) {
        this.vehicleService.createVehicle(payload).subscribe({
          next: (res) => {
            this.ngZone.run(() => this.loadVehicles());
            if (res?.success) {
              this.messagingService.showSuccess(res.message ?? 'Vehicle created.');
            } else {
              this.messagingService.showError(res?.message ?? 'Create failed.');
            }
          },
          error: (err) => {
            this.messagingService.showError(err?.error?.message ?? 'Failed to create vehicle.');
          }
        });
      }
    });
  }

  openEditDialog(vehicle: Vehicle): void {
    const ref = this.dialog.open(VehicleFormDialogComponent, {
      width: '400px',
      data: { vehicle }
    });
    ref.afterClosed().subscribe((payload) => {
      if (payload) {
        this.vehicleService.updateVehicle(vehicle.id, payload).subscribe({
          next: (res) => {
            this.ngZone.run(() => this.loadVehicles());
            if (res?.success) {
              this.messagingService.showSuccess(res.message ?? 'Vehicle updated.');
            } else {
              this.messagingService.showError(res?.message ?? 'Update failed.');
            }
          },
          error: (err) => {
            this.messagingService.showError(err?.error?.message ?? 'Failed to update vehicle.');
          }
        });
      }
    });
  }

  openDeleteDialog(vehicle: Vehicle): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete vehicle',
        message: `Are you sure you want to delete vehicle "${vehicle.licensePlate}" (ID: ${vehicle.id})?`
      }
    });
    ref.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.vehicleService.deleteVehicle(vehicle.id).subscribe({
          next: (res) => {
            this.ngZone.run(() => this.loadVehicles());
            if (res?.success) {
              this.messagingService.showSuccess(res.message ?? 'Vehicle deleted.');
            } else {
              this.messagingService.showError(res?.message ?? 'Delete failed.');
            }
          },
          error: (err) => {
            this.messagingService.showError(err?.error?.message ?? 'Failed to delete vehicle.');
          }
        });
      }
    });
  }
}
