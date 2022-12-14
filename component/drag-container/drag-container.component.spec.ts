import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragContainerComponent } from './drag-container.component';

describe('DragContainerComponent', () => {
  let component: DragContainerComponent;
  let fixture: ComponentFixture<DragContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
