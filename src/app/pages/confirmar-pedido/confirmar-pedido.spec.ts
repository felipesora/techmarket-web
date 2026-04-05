import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarPedido } from './confirmar-pedido';
import { RouterTestingModule } from '@angular/router/testing';

describe('ConfirmarPedido', () => {
  let component: ConfirmarPedido;
  let fixture: ComponentFixture<ConfirmarPedido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmarPedido, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmarPedido);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
