import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../../../../@core/customs/common.service';
import { STATUS_ACTION, SUCCESS_NOTICE, SUCCESS_RESPONSE } from '../../../../@core/customs/constants';
import { AboutModel, AshionShop, CommentModel, KhoSpModel } from '../../../../@core/data/ashion-shop.service';

@Component({
  selector: 'ngx-binh-luan-create',
  templateUrl: './binh-luan-create.component.html',
  styleUrls: ['./binh-luan-create.component.scss']
})
export class BinhLuanCreateComponent implements OnInit {
  constructor(
    private commonService: CommonService,
    private api: AshionShop,
    @Inject(MAT_DIALOG_DATA) public dataRef: { key: string, actionType: number },
    private dialogRef: MatDialogRef<BinhLuanCreateComponent>
  ) { }

  statusAction = STATUS_ACTION;
  titleHeader: string = "Bình luận người dùng";
  target: CommentModel = new CommentModel();
  lstProduct: KhoSpModel[] = [];
  lstAbout: AboutModel[] = [];
  lstComment: CommentModel[] = [];

  ngOnInit(): void {
    if (this.dataRef.actionType !== this.statusAction.create) {
      this.loadData();
    }

    this.api.aboutSelectAll().subscribe(res => {
      if (res.code === SUCCESS_RESPONSE) {
        this.lstAbout = res.data;
      }
    });

    this.api.commentSelectAll().subscribe(res => {
      if (res.code === SUCCESS_RESPONSE) {
        this.lstComment = res.data;
      }
    });

    this.api.khoSpSelectAll().subscribe(res => {
      if (res.code === SUCCESS_RESPONSE) {
        this.lstProduct = res.data;
      }
    });

  }

  loadData(): void {
    this.api.commentSelectOne(this.dataRef.key).subscribe((res) => {
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
      this.api.commentInsert(this.target).subscribe((res) => {
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
      this.api.commentUpdate(this.target).subscribe((res) => {
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
