import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesProduto } from './detalhes-produto';
import { RouterTestingModule } from '@angular/router/testing';

describe('DetalhesProduto', () => {
  let component: DetalhesProduto;
  let fixture: ComponentFixture<DetalhesProduto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesProduto, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalhesProduto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
