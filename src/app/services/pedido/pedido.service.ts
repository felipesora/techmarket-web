import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PedidoPageResponse, PedidoRequest, PedidoResponse } from '../../types/pedido';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {

  private readonly API = 'http://localhost:8080/techmarket-order-service/pedidos';

  constructor(private http: HttpClient) {}

  criarPedido(pedido: PedidoRequest): Observable<PedidoResponse> {
    const token = localStorage.getItem('tokenUser');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<PedidoResponse>(this.API, pedido, { headers });
  }

  getPedidoPorId(idPedido: number): Observable<PedidoResponse> {
    const token = localStorage.getItem('tokenUser');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<PedidoResponse>(`${this.API}/${idPedido}`, { headers });
  }

  getPedidosPorIdUsuario(idUsuario: number, page: number = 0, size: number = 5): Observable<PedidoPageResponse> {
    const token = localStorage.getItem('tokenUser');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<PedidoPageResponse>(`${this.API}/usuario/${idUsuario}`, { headers, params });
  }
}
