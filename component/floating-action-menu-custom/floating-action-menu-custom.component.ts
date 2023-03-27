import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FloatingActionMenuCustomViewModel } from './floating-action-menu-custom.viewmodel';

@Component({
  selector: 'h2-floating-action-menu-custom',
  templateUrl: './floating-action-menu-custom.component.html',
  styleUrls: ['./floating-action-menu-custom.component.scss']
})
export class FloatingActionMenuCustomComponent implements OnInit {

  @Input()
  viewModel: FloatingActionMenuCustomViewModel

  @Input()
  customMenuMainButton: TemplateRef<any>

  @Input()
  customMenuChildButtonList: TemplateRef<any>

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  constructor() { }

  ngOnInit(): void {
  }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
  async onMainButtonClicked() {
    this.viewModel.isOpen = !this.viewModel.isOpen
  }

  async onChildButtonClicked(item) {
    console.log('onChildButtonClicked', item)
  }
}
