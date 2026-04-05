import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PedidoRequest, PedidoResponse } from '../../types/pedido';
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
}
