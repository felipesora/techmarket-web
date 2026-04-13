import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosFavoritos } from './produtos-favoritos';

describe('ProdutosFavoritos', () => {
  let component: ProdutosFavoritos;
  let fixture: ComponentFixture<ProdutosFavoritos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutosFavoritos],
    }).compileComponents();

    fixture = TestBed.createComponent(ProdutosFavoritos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
