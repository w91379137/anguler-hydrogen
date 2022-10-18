import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertViewModel } from './alert.viewmodel';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public viewModel: AlertViewModel,
  ) { }

  ngOnInit(): void {
    // console.log(this.viewModel);
  }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  onConfirmClicked(): void {
    this.viewModel.isConfirm = true;
    this.dialogRef.close(this.viewModel);
  }

  onCancelClicked(): void {
    this.viewModel.isConfirm = false;
    this.dialogRef.close(this.viewModel);
  }
}
