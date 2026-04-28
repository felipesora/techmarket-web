import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPedidos } from './listar-pedidos';

describe('ListarPedidos', () => {
  let component: ListarPedidos;
  let fixture: ComponentFixture<ListarPedidos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarPedidos],
    }).compileComponents();

    fixture = TestBed.createComponent(ListarPedidos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
