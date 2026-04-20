import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessoNegado } from './acesso-negado';
import { RouterTestingModule } from '@angular/router/testing';

describe('AcessoNegado', () => {
  let component: AcessoNegado;
  let fixture: ComponentFixture<AcessoNegado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcessoNegado, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AcessoNegado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
