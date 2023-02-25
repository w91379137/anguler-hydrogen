import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IObserverData } from '../../util/rxjs/i-observer-data';
import { H2ViewModel } from './h2.viewmodel';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-h2',
  templateUrl: './h2.component.html',
  styleUrls: ['./h2.component.scss']
})
export class H2Component<ViewModelType = H2ViewModel> implements OnInit, OnDestroy {

  public id = new Date().getTime()

  @Input()
  public viewModel: ViewModelType

  protected ngUnsubscribe = new Subject<void>()

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  constructor() { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next()
    this.ngUnsubscribe.complete()
  }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  autoUnsubscribeObserver<OutputType>(observable: Observable<OutputType>): Observable<OutputType> {
    let result = observable
    .pipe(takeUntil(this.ngUnsubscribe))
    return result
  }

  autoUnsubscribeData<OutputType>(data: IObserverData<OutputType>): Observable<OutputType> {
    let info = {
      className: this.constructor.name,
      data: {
        id: this.id
      }
    }
    let result = data.manage(this.ngUnsubscribe, info)
    return result
  }
}
