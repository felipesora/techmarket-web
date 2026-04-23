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

  getTodosProdutos(page: number = 0, size: number = 10): Observable<ProdutoPageResponse> {
    const token = localStorage.getItem('tokenUser');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<ProdutoPageResponse>(this.API, { headers, params });
  };

  getProdutosMaisVendidos(page: number = 0, size: number = 10): Observable<ProdutoPageResponse> {
    const token = localStorage.getItem('tokenUser');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<ProdutoPageResponse>(`${this.API}/mais-vendidos`, { headers, params });
  };

  getProdutosEmPromocao(page: number = 0, size: number = 10): Observable<ProdutoPageResponse> {
    const token = localStorage.getItem('tokenUser');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<ProdutoPageResponse>(`${this.API}/promocoes`, { headers, params });
  };

  getProdutosPorIds(ids: string[]): Observable<Produto[]> {
    const token = localStorage.getItem('tokenUser');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<Produto[]>(`${this.API}/buscar-por-ids`, ids, { headers });
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

  getQuantidadeProdutos(): Observable<number> {
    const token = localStorage.getItem('tokenUser');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<number>(`${this.API}/total-produtos-ativos`, { headers });
  };

  getProdutosMaisVendidosAdmin(page: number = 0, size: number = 10): Observable<ProdutoPageResponse> {
    const token = localStorage.getItem('tokenUser');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<ProdutoPageResponse>(`${this.API}/admin/mais-vendidos`, { headers, params });
  };

  getProdutosEmPromocaoAdmin(page: number = 0, size: number = 10): Observable<ProdutoPageResponse> {
    const token = localStorage.getItem('tokenUser');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<ProdutoPageResponse>(`${this.API}/admin/promocoes`, { headers, params });
  };
}
