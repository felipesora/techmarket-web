import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagamentoResponse } from '../../types/pagamento';
import { Observable } from 'rxjs';
import { env } from '../../core/env';

@Injectable({
  providedIn: 'root',
})
export class PagamentoService {

  private readonly API = `${env.apiUrl}/techmarket-payment-service/pagamentos`;

  constructor(private http: HttpClient) {}

  confirmarPagamento(idPedido: number): Observable<PagamentoResponse> {
    const token = localStorage.getItem('tokenUser');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.patch<PagamentoResponse>(`${this.API}/${idPedido}/confirmar`, null, { headers });
  }
}
