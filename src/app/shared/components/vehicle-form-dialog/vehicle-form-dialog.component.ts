import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Vehicle } from '../../models/vehicle';
import type { CreateOrUpdateVehiclePayload } from '../../services/vehicle.service';

export interface VehicleFormDialogData {
  vehicle?: Vehicle | null;
}

export const VEHICLE_TYPES = [
  { value: 0, label: 'Motorcycle' },
  { value: 1, label: 'Car' }
] as const;

@Component({
  selector: 'app-vehicle-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data?.vehicle ? 'Edit vehicle' : 'Create vehicle' }}</h2>
    <mat-dialog-content>
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>License plate</mat-label>
        <input matInput [(ngModel)]="licensePlate" required />
      </mat-form-field>
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Type</mat-label>
        <mat-select [(ngModel)]="type" required>
          @for (opt of vehicleTypes; track opt.value) {
            <mat-option [value]="opt.value">{{ opt.label }}</mat-option>
          }
        </mat-select>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-raised-button color="primary" (click)="save()">Save</button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      .full-width {
        width: 100%;
        display: block;
      }
      mat-dialog-content {
        min-width: 320px;
        padding-top: 8px;
      }
    `
  ]
})
export class VehicleFormDialogComponent {
  readonly data: VehicleFormDialogData | null = inject(MAT_DIALOG_DATA, { optional: true });
  private readonly dialogRef = inject(MatDialogRef<VehicleFormDialogComponent>);

  licensePlate = '';
  type: number = 0;
  readonly vehicleTypes = VEHICLE_TYPES;

  constructor() {
    const v = this.data?.vehicle;
    if (v) {
      this.licensePlate = v.licensePlate;
      this.type = v.type;
    }
  }

  save(): void {
    const payload: CreateOrUpdateVehiclePayload = {
      licensePlate: this.licensePlate.trim(),
      type: this.type
    };
    this.dialogRef.close(payload);
  }
}
