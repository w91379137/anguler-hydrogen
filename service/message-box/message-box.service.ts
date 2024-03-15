import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AlertComponent } from '../../component/alert/alert.component';
import {
  AlertViewModel,
  AlertTitle,
  AlertButtonMode,
} from '../../component/alert/alert.viewmodel';

@Injectable({
  providedIn: 'root',
})
export class MessageBoxService {
  constructor(protected dialog: MatDialog) {}

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====
  // action

  showAlert(
    data: AlertViewModel,
    disableClose: boolean = true
  ): Observable<AlertViewModel | undefined> {
    const dialogRef = this.dialog.open(AlertComponent, {
      data,
      panelClass: '',
      width: '350px',
    });

    dialogRef.disableClose = disableClose;
    return dialogRef.afterClosed();
  }

  showAlertSuccessError(
    isSuccess: boolean,
    successMessage: string | string[],
    warningMessage: string | string[]
  ): Observable<AlertViewModel | undefined> {
    return isSuccess
      ? this.showAlertSuccess(successMessage)
      : this.showAlertError(warningMessage);
  }

  showAlertSuccess(
    message: string | string[]
  ): Observable<AlertViewModel | undefined> {
    let vm = new AlertViewModel();
    vm.title = AlertTitle.Success;
    vm.messageList = Array.isArray(message) ? message : [message];
    vm.mode = AlertButtonMode.onlyyes;
    return this.showAlert(vm);
  }

  showAlertWarning(
    message: string | string[]
  ): Observable<AlertViewModel | undefined> {
    let vm = new AlertViewModel();
    vm.title = AlertTitle.Warning;
    vm.messageList = Array.isArray(message) ? message : [message];
    vm.mode = AlertButtonMode.yesno;
    return this.showAlert(vm);
  }

  showAlertError(
    message: string | string[]
  ): Observable<AlertViewModel | undefined> {
    let vm = new AlertViewModel();
    vm.title = AlertTitle.Error;
    vm.messageList = Array.isArray(message) ? message : [message];
    vm.mode = AlertButtonMode.onlyyes;
    return this.showAlert(vm);
  }
}
