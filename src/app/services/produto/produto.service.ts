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

  getProdutosPorIds(ids: string[]): Observable<Produto[]> {
    const token = localStorage.getItem('tokenUser');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<Produto[]>(`${this.API}/favoritos`, ids, { headers });
  };

  getProdutosPorCategoria(categoria: string, ordenarPor: string): Observable<Produto[]> {
    const token = localStorage.getItem('tokenUser');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const params = new HttpParams()
      .set('categoria', categoria)
      .set('ordenarPor', ordenarPor);

    return this.http.get<Produto[]>(this.API, { headers, params });
  };

  getProdutosPorBusca(busca: string, ordenarPor: string): Observable<Produto[]> {
    const token = localStorage.getItem('tokenUser');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const params = new HttpParams()
      .set('busca', busca)
      .set('ordenarPor', ordenarPor);

    return this.http.get<Produto[]>(this.API, { headers, params });
  };

  getProdutoPorId(id: string): Observable<Produto> {
    const token = localStorage.getItem('tokenUser');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<Produto>(`${this.API}/${id}`, { headers });
  };
}
