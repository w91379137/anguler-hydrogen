import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { FloatingActionMenuItemViewModel, FloatingActionMenuViewModel } from './floating-action-menu.viewmodel';

@Component({
  selector: 'h2-floating-action-menu',
  templateUrl: './floating-action-menu.component.html',
  styleUrls: ['./floating-action-menu.component.scss']
})
export class FloatingActionMenuComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject<void>()

  @Input()
  public viewModel: FloatingActionMenuViewModel

  @Output()
  buttonClicked = new EventEmitter<FloatingActionMenuItemViewModel>()

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
  // action
  async onMainButtonClicked() {
    this.viewModel.isOpen = !this.viewModel.isOpen
  }

  async onChildButtonClicked(vm: FloatingActionMenuItemViewModel) {
    this.buttonClicked.emit(vm)
  }
}
