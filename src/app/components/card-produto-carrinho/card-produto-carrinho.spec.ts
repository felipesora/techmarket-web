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
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
