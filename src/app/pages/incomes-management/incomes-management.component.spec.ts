import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomesManagementComponent } from './incomes-management.component';

describe('IncomesManagementComponent', () => {
  let component: IncomesManagementComponent;
  let fixture: ComponentFixture<IncomesManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomesManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
