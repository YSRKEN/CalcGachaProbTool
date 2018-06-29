import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestProbComponent } from './test-prob.component';

describe('TestProbComponent', () => {
  let component: TestProbComponent;
  let fixture: ComponentFixture<TestProbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestProbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestProbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
