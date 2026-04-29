import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesPedido } from './detalhes-pedido';
import { RouterTestingModule } from '@angular/router/testing';

describe('DetalhesPedido', () => {
  let component: DetalhesPedido;
  let fixture: ComponentFixture<DetalhesPedido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesPedido, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalhesPedido);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
