import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingActionMenuCustomComponent } from './floating-action-menu-custom.component';

describe('FloatingActionMenuCustomComponent', () => {
  let component: FloatingActionMenuCustomComponent;
  let fixture: ComponentFixture<FloatingActionMenuCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloatingActionMenuCustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingActionMenuCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
