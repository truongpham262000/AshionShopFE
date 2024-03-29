import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../../../../@core/customs/common.service';
import { LIST_STATUS, STATUS_ACTION, SUCCESS_NOTICE, SUCCESS_RESPONSE, TYPE_DANHMUC } from '../../../../@core/customs/constants';
import { AshionShop, CategoryModel, SysUserModel } from '../../../../@core/data/ashion-shop.service';

@Component({
  selector: 'ngx-danh-muc-bai-viet-create',
  templateUrl: './danh-muc-bai-viet-create.component.html',
  styleUrls: ['./danh-muc-bai-viet-create.component.scss']
})
export class DanhMucBaiVietCreateComponent implements OnInit {
  constructor(
    private commonService: CommonService,
    private api: AshionShop,
    @Inject(MAT_DIALOG_DATA) public dataRef: { key: string, actionType: number },
    private dialogRef: MatDialogRef<DanhMucBaiVietCreateComponent>
  ) { }

  statusAction = STATUS_ACTION;
  titleHeader: string = "Danh mục bài viết";
  target: CategoryModel = new CategoryModel();
  trangThai = LIST_STATUS;
  lstDanhMucCha: CategoryModel[] = [];
  user: SysUserModel = new SysUserModel();

  ngOnInit(): void {
    if (this.dataRef.actionType !== this.statusAction.create) {
      this.loadData();
    } else {
      this.target.trangThai = this.trangThai[1].value;
      this.user = this.commonService.getUserInfor();
      this.target.nguoiTao = this.user.fullName;
    }

    this.api.categorySelectAll(TYPE_DANHMUC.BAI_VIET).subscribe(res => {
      if (res.code === SUCCESS_RESPONSE) {
        this.lstDanhMucCha = res.data;
      }
    });
  }

  loadData(): void {
    this.api.categorySelectOne(this.dataRef.key, TYPE_DANHMUC.BAI_VIET).subscribe((res) => {
      if (res.code === SUCCESS_RESPONSE) {
        this.target = res.data;
      } else {
        this.commonService.toastrDanger("Không tìm thấy dữ liệu !!!");
        this.closeDialog(false)
      }
    })
  }

  save(): void {
    this.target.typeDanhMuc = TYPE_DANHMUC.BAI_VIET;
    if (this.dataRef.actionType === STATUS_ACTION.create) {
      this.api.categoryInsert(this.target).subscribe((res) => {
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
      this.api.categoryUpdate(this.target).subscribe((res) => {
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
