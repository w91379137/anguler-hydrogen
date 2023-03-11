import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'h2-drag-container',
  templateUrl: './drag-container.component.html',
  styleUrls: ['./drag-container.component.scss']
})
export class DragContainerComponent implements OnInit {

  // https://stackoverflow.com/questions/56925391/differentiate-cdkdrag-and-click-in-angular
  public contentClickable = true

  @Input()
  boundary = { top: '0', bottom: '0', left: '0', right: '0' }

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
