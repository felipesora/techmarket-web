import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProdutos } from './lista-produtos';
import { RouterTestingModule } from '@angular/router/testing';

describe('ListaProdutos', () => {
  let component: ListaProdutos;
  let fixture: ComponentFixture<ListaProdutos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaProdutos, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaProdutos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
