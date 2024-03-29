import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../../../../@core/customs/common.service';
import { LIST_STATUS, STATUS_ACTION, SUCCESS_NOTICE, SUCCESS_RESPONSE } from '../../../../@core/customs/constants';
import { AshionShop, GroupSateModel, SysUserModel } from '../../../../@core/data/ashion-shop.service';

@Component({
  selector: 'ngx-danh-muc-tu-dien-create',
  templateUrl: './danh-muc-tu-dien-create.component.html',
  styleUrls: ['./danh-muc-tu-dien-create.component.scss']
})
export class DanhMucTuDienCreateComponent implements OnInit {
  constructor(
    private commonService: CommonService,
    private api: AshionShop,
    @Inject(MAT_DIALOG_DATA) public dataRef: { key: string, actionType: number },
    private dialogRef: MatDialogRef<DanhMucTuDienCreateComponent>
  ) { }

  statusAction = STATUS_ACTION;
  titleHeader: string = "Danh mục từ điển";
  target: GroupSateModel = new GroupSateModel();
  trangThai = LIST_STATUS;
  user: SysUserModel = new SysUserModel();

  ngOnInit(): void {
    if (this.dataRef.actionType !== this.statusAction.create) {
      this.loadData();
    } else {
      this.target.trangThai = this.trangThai[1].value;
      this.user = this.commonService.getUserInfor();
      this.target.nguoiTao = this.user.fullName;
    }
  }

  loadData(): void {
    this.api.groupSateSelectOne(this.dataRef.key).subscribe((res) => {
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
      this.api.groupSateInsert(this.target).subscribe((res) => {
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
      this.api.groupSateUpdate(this.target).subscribe((res) => {
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
