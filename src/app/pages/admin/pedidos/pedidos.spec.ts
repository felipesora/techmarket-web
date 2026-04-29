import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pedidos } from './pedidos';
import { RouterTestingModule } from '@angular/router/testing';

describe('Pedidos', () => {
  let component: Pedidos;
  let fixture: ComponentFixture<Pedidos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pedidos, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Pedidos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
