import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaoEncontrado } from './nao-encontrado';
import { RouterTestingModule } from '@angular/router/testing';

describe('NaoEncontrado', () => {
  let component: NaoEncontrado;
  let fixture: ComponentFixture<NaoEncontrado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NaoEncontrado, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NaoEncontrado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
