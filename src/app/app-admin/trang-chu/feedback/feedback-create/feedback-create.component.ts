import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../../../../@core/customs/common.service';
import { LIST_GENDER, LIST_STATUS_FEEDBACK, STATUS_ACTION, SUCCESS_NOTICE, SUCCESS_RESPONSE } from '../../../../@core/customs/constants';
import { AshionShop, FeedBackModel } from '../../../../@core/data/ashion-shop.service';

@Component({
  selector: 'ngx-feedback-create',
  templateUrl: './feedback-create.component.html',
  styleUrls: ['./feedback-create.component.scss']
})
export class FeedbackCreateComponent implements OnInit {
  constructor(
    private commonService: CommonService,
    private api: AshionShop,
    @Inject(MAT_DIALOG_DATA) public dataRef: { key: string, actionType: number },
    private dialogRef: MatDialogRef<FeedbackCreateComponent>
  ) { }

  statusAction = STATUS_ACTION;
  lstGioiTinh = LIST_GENDER;
  lstStatus = LIST_STATUS_FEEDBACK;
  titleHeader: string = "Phản hồi người dùng";
  target: FeedBackModel = new FeedBackModel();

  ngOnInit(): void {
    if (this.dataRef.actionType !== this.statusAction.create) {
      this.loadData();
    } else {
      this.target.trangThai = 0;
    }

  }

  loadData(): void {
    this.api.feedBackSelectOne(this.dataRef.key).subscribe((res) => {
      if (res.code === SUCCESS_RESPONSE) {
        this.target = res.data;
      } else {
        this.commonService.toastrDanger("Không tìm thấy dữ liệu !!!");
        this.closeDialog(false)
      }
    })
  }

  save(): void {
    if (this.dataRef.actionType === STATUS_ACTION.create) {
      this.api.feedBackInsert(this.target).subscribe((res) => {
        if (res.code === SUCCESS_RESPONSE) {
          this.dialogRef.close(true);
          this.commonService.toastrSuccess(SUCCESS_NOTICE);
          this.loadData();
        } else {
          this.commonService.toastrDanger("Không thể thêm " + this.titleHeader + " này !!!");
          this.dialogRef.close(false);
        }
      })
    } else {
      this.api.feedBackUpdate(this.target).subscribe((res) => {
        if (res.code === SUCCESS_RESPONSE) {
          this.dialogRef.close(true);
          this.loadData();
          this.commonService.toastrSuccess(SUCCESS_NOTICE);
        } else {
          this.commonService.toastrDanger("Không thể cập nhật " + this.titleHeader + " !!!");
          this.dialogRef.close(false);
        }
      })
    }
  }

  closeDialog(value) {
    this.dialogRef.close(value)
  }
}
