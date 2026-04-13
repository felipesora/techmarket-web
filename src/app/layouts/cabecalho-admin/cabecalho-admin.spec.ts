import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabecalhoAdmin } from './cabecalho-admin';

describe('CabecalhoAdmin', () => {
  let component: CabecalhoAdmin;
  let fixture: ComponentFixture<CabecalhoAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CabecalhoAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(CabecalhoAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
