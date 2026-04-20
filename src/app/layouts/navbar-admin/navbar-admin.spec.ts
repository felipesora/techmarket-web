import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarAdmin } from './navbar-admin';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarAdmin', () => {
  let component: NavbarAdmin;
  let fixture: ComponentFixture<NavbarAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarAdmin, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
