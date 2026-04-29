import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarProdutos } from './listar-produtos';
import { RouterTestingModule } from '@angular/router/testing';

describe('ListarProdutos', () => {
  let component: ListarProdutos;
  let fixture: ComponentFixture<ListarProdutos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarProdutos, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ListarProdutos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
