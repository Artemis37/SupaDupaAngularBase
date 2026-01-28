import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import axios from 'axios';
import { Vehicle } from '../models/vehicle';
import { ApiResponse } from '../models/api-response';
import { PagedResult } from '../models/paged-result';

export interface GetVehiclesParams {
  searchText?: string;
  pageNumber?: number;
  pageSize?: number;
}

export interface CreateOrUpdateVehiclePayload {
  type: number;
  licensePlate: string;
}

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  getVehicles(params?: GetVehiclesParams): Observable<ApiResponse<PagedResult<Vehicle>>> {
    const queryParams: Record<string, string | number> = {};
    if (params?.searchText != null && params.searchText !== '') {
      queryParams['searchText'] = params.searchText;
    }
    if (params?.pageNumber != null) {
      queryParams['pageNumber'] = params.pageNumber;
    }
    if (params?.pageSize != null) {
      queryParams['pageSize'] = params.pageSize;
    }
    return from(
      axios.get<ApiResponse<PagedResult<Vehicle>>>('Vehicle', { params: queryParams }).then((r) => r.data)
    );
  }

  createVehicle(payload: CreateOrUpdateVehiclePayload): Observable<ApiResponse<boolean>> {
    return from(
      axios.post<ApiResponse<boolean>>('Vehicle', payload).then((r) => r.data)
    );
  }

  updateVehicle(id: number, payload: CreateOrUpdateVehiclePayload): Observable<ApiResponse<boolean>> {
    return from(
      axios.put<ApiResponse<boolean>>(`Vehicle/${id}`, payload).then((r) => r.data)
    );
  }

  deleteVehicle(id: number): Observable<ApiResponse<boolean>> {
    return from(
      axios.delete<ApiResponse<boolean>>(`Vehicle/${id}`).then((r) => r.data)
    );
  }
}
