import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Carrinho } from './carrinho';
import { RouterTestingModule } from '@angular/router/testing';

describe('Carrinho', () => {
  let component: Carrinho;
  let fixture: ComponentFixture<Carrinho>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Carrinho, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Carrinho);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
