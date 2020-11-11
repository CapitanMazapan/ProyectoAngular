import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRegisterDashComponent } from './add-register-dash.component';

describe('AddRegisterDashComponent', () => {
  let component: AddRegisterDashComponent;
  let fixture: ComponentFixture<AddRegisterDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRegisterDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRegisterDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
