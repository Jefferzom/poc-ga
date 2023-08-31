import { DataContractAdapter } from './../shared/adapter/contract.adapter';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private dataContractAdapter: DataContractAdapter) { }

  getContracts(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/contracts`).pipe(
      map((response: any) => {
        const adapedResponse = this.dataContractAdapter.adaptData(response)
        return adapedResponse
      })
    )
  }
}
