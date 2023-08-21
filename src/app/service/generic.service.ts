import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // getDataWithPagination(page: number, limit: number): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/tabela?_page=${page}&_limit=${limit}`);
  // }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tabela`);
  }
}
