import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPedido } from './card-pedido';
import { PedidoResponse } from '../../types/pedido';
import { RouterTestingModule } from '@angular/router/testing';

describe('CardPedido', () => {
  let component: CardPedido;
  let fixture: ComponentFixture<CardPedido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPedido, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CardPedido);
    component = fixture.componentInstance;

    component.pedido = {
      id_pedido: 1,
      id_usuario: 1,
      data_criacao: '2026-01-01T10:00:00',
      status_pedido: 'AGUARDANDO_PAGAMENTO',
      metodo_pagamento: 'PIX',
      valor_total: 100,
      itens: []
    } as PedidoResponse;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
