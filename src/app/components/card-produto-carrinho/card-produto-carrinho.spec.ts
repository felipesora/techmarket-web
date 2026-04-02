import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProdutoCarrinho } from './card-produto-carrinho';

describe('CardProdutoCarrinho', () => {
  let component: CardProdutoCarrinho;
  let fixture: ComponentFixture<CardProdutoCarrinho>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardProdutoCarrinho],
    }).compileComponents();

    fixture = TestBed.createComponent(CardProdutoCarrinho);
    component = fixture.componentInstance;

    component.produto = {
      categoria: 'NOTEBOOKS',
      nome: 'Notebook Teste',
      marca: 'Marca Teste',
      preco: 2999.99
    } as any;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
