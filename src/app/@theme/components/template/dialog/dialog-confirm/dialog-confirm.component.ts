import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ngx-dialog-confirm',
  templateUrl: './dialog-confirm.component.html'
})
export class DialogConfirmComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: {
      title: string, message: string
        , icon: string, color: string, type: number, isAppend: boolean
    },
    private dialogRef: MatDialogRef<DialogConfirmComponent>
  ) { }

  icon: string;
  title: string;
  message: string;
  color: string;
  isAppend: boolean;
  type: number; // 0: Đồng ý; 1: Đồng ý - Hủy;

  ngOnInit(): void {
    this.icon = this.data.icon ?? 'info-circle';
    this.color = this.data.color ?? 'text-primary';
    this.title = this.data.title ?? 'Thông báo';
    this.message = this.data.message ?? null;
    this.type = this.data.type ?? 0;
    this.isAppend = this.data.isAppend ?? false;
  }

  confirm(value: boolean) {
    this.dialogRef.close(value);
  }

}
