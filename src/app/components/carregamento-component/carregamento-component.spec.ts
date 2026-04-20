import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarregamentoComponent } from './carregamento-component';

describe('CarregamentoComponent', () => {
  let component: CarregamentoComponent;
  let fixture: ComponentFixture<CarregamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarregamentoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarregamentoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
