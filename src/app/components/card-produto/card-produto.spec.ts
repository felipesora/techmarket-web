import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProduto } from './card-produto';
import { RouterTestingModule } from '@angular/router/testing';

describe('Produto', () => {
  let component: CardProduto;
  let fixture: ComponentFixture<CardProduto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardProduto, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CardProduto);
    component = fixture.componentInstance;

    // Definir o produto ANTES do detectChanges
    component.produto = {
      categoria: 'NOTEBOOKS',
      nome: 'Notebook Teste',
      marca: 'Marca Teste',
      preco: 2999.99
    } as any;

    fixture.detectChanges(); // agora sim
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
