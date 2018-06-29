import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcProbComponent } from './calc-prob.component';

describe('CalcProbComponent', () => {
  let component: CalcProbComponent;
  let fixture: ComponentFixture<CalcProbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalcProbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcProbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
