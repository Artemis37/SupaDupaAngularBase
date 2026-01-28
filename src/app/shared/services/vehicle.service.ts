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
}
