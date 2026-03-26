import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProdutoPageResponse } from '../../types/produto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {

  private readonly API = 'http://localhost:8080/techmarket-product-service/produtos';

  constructor(private http: HttpClient) {}

  getTodosProdutos(): Observable<ProdutoPageResponse> {
    const token = localStorage.getItem('tokenUser');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    return this.http.get<ProdutoPageResponse>(this.API, { headers });
  }
}
