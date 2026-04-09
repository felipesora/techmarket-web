import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusPedidos } from './meus-pedidos';
import { RouterTestingModule } from '@angular/router/testing';

describe('MeusPedidos', () => {
  let component: MeusPedidos;
  let fixture: ComponentFixture<MeusPedidos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeusPedidos, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MeusPedidos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
