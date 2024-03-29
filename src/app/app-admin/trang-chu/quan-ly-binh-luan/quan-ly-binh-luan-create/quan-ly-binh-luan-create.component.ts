import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../../../../@core/customs/common.service';
import { LIST_STATUS, STATUS_ACTION, SUCCESS_NOTICE, SUCCESS_RESPONSE } from '../../../../@core/customs/constants';
import { AshionShop, CommentErrorModel } from '../../../../@core/data/ashion-shop.service';

@Component({
  selector: 'ngx-quan-ly-binh-luan-create',
  templateUrl: './quan-ly-binh-luan-create.component.html',
  styleUrls: ['./quan-ly-binh-luan-create.component.scss']
})
export class QuanLyBinhLuanCreateComponent implements OnInit {
  constructor(
    private commonService: CommonService,
    private api: AshionShop,
    @Inject(MAT_DIALOG_DATA) public dataRef: { key: string, actionType: number },
    private dialogRef: MatDialogRef<QuanLyBinhLuanCreateComponent>
  ) { }

  statusAction = STATUS_ACTION;
  lstStatus = LIST_STATUS;
  titleHeader: string = "Từ khóa";
  target: CommentErrorModel = new CommentErrorModel();

  ngOnInit(): void {
    if (this.dataRef.actionType !== this.statusAction.create) {
      this.loadData();
    } else {
      this.target.trangThai = 1;
    }

  }

  loadData(): void {
    this.api.commentErrorSelectOne(this.dataRef.key).subscribe((res) => {
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
      this.api.commentErrorInsert(this.target).subscribe((res) => {
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
      this.api.commentErrorUpdate(this.target).subscribe((res) => {
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
