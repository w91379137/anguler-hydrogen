import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FloatingActionViewModel } from './floating-action-menu.viewmodel';

@Component({
  selector: 'h2-floating-action-menu',
  templateUrl: './floating-action-menu.component.html',
  styleUrls: ['./floating-action-menu.component.scss']
})
export class FloatingActionMenuComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject<void>();

  @Input()
  public viewModel: FloatingActionViewModel | undefined;

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

}
