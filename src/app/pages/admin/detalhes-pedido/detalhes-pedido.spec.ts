import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesPedido } from './detalhes-pedido';

describe('DetalhesPedido', () => {
  let component: DetalhesPedido;
  let fixture: ComponentFixture<DetalhesPedido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesPedido],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalhesPedido);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
