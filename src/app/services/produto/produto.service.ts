import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto, ProdutoPageResponse } from '../../types/produto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {

  private readonly API = 'http://localhost:8080/techmarket-product-service/produtos';

  constructor(private http: HttpClient) {}

  getTodosProdutos(page: number = 0, size: number = 15): Observable<ProdutoPageResponse> {
    const token = localStorage.getItem('tokenUser');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<ProdutoPageResponse>(this.API, { headers, params });
  };

  getProdutosFavoritados(ids: string[]): Observable<Produto[]> {
    const token = localStorage.getItem('tokenUser');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<Produto[]>(`${this.API}/favoritos`, ids, { headers });
  };
}
