import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarUsuario } from './cadastrar-usuario';
import { RouterTestingModule } from '@angular/router/testing';
import { provideNgxMask } from 'ngx-mask';

describe('CadastrarUsuario', () => {
  let component: CadastrarUsuario;
  let fixture: ComponentFixture<CadastrarUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarUsuario, RouterTestingModule],
      providers: [provideNgxMask()]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastrarUsuario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
