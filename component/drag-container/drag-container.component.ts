import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'h2-drag-container',
  templateUrl: './drag-container.component.html',
  styleUrls: ['./drag-container.component.scss']
})
export class DragContainerComponent implements OnInit {

  // https://stackoverflow.com/questions/56925391/differentiate-cdkdrag-and-click-in-angular
  public contentClickable = true

  @Output()
  DragStart = new EventEmitter<void>();

  @Output()
  DragEnd = new EventEmitter<void>();

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  constructor() { }

  ngOnInit(): void { }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
  // action
  async onDragStarted() {
    this.contentClickable = false
    this.DragStart.emit()
  }

  async onDragEnded() {
    this.contentClickable = true
    this.DragEnd.emit()
  }
}
