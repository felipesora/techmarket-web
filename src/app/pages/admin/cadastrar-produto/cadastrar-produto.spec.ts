import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarProduto } from './cadastrar-produto';
import { RouterTestingModule } from '@angular/router/testing';

describe('CadastrarProduto', () => {
  let component: CadastrarProduto;
  let fixture: ComponentFixture<CadastrarProduto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarProduto, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastrarProduto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
