import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarUsuarios } from './listar-usuarios';
import { RouterTestingModule } from '@angular/router/testing';

describe('ListarUsuarios', () => {
  let component: ListarUsuarios;
  let fixture: ComponentFixture<ListarUsuarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarUsuarios, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ListarUsuarios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
