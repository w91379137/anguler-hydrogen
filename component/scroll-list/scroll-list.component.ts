import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ScrollItemViewModel, ScrollListViewModel } from './scroll-list.viewmodel';

@Component({
  selector: 'h2-scroll-list',
  templateUrl: './scroll-list.component.html',
  styleUrls: ['./scroll-list.component.scss']
})
export class ScrollListComponent implements OnInit {

  @Input()
  public viewModel: ScrollListViewModel;

  @Output()
  cardClicked = new EventEmitter<ScrollItemViewModel>();

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  constructor() { }

  ngOnInit(): void {
  }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
  onCardClicked(item: ScrollItemViewModel) {
    this.cardClicked.emit(item)
  }
}
