import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusDados } from './meus-dados';
import { RouterTestingModule } from '@angular/router/testing';
import { provideNgxMask } from 'ngx-mask';

describe('MeusDados', () => {
  let component: MeusDados;
  let fixture: ComponentFixture<MeusDados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeusDados, RouterTestingModule],
      providers: [provideNgxMask()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeusDados);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
