import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService, ConvertDatePipe } from '../../../../@core/customs/common.service';
import { LIST_STATUS_USER, STATUS_ACTION, SUCCESS_NOTICE, SUCCESS_RESPONSE } from '../../../../@core/customs/constants';
import { AshionShop, List_District, List_Province, List_Ward, ShopUserModel, SysUserModel } from '../../../../@core/data/ashion-shop.service';

@Component({
  selector: 'ngx-quan-ly-shop-create',
  templateUrl: './quan-ly-shop-create.component.html',
  styleUrls: ['./quan-ly-shop-create.component.scss']
})
export class QuanLyShopCreateComponent implements OnInit {
  constructor(
    private commonService: CommonService,
    private api: AshionShop,
    @Inject(MAT_DIALOG_DATA) public dataRef: { key: string, actionType: number },
    private dialogRef: MatDialogRef<QuanLyShopCreateComponent>
  ) { }

  statusAction = STATUS_ACTION;
  titleHeader: string = "Thông tin shop người dùng";
  target: ShopUserModel = new ShopUserModel();
  listStatus = LIST_STATUS_USER;
  listCategory: any[];
  lstUser: SysUserModel[] = [];
  lstTinh: List_Province[] = [];
  lstHuyen: List_District[] = [];
  lstXa: List_Ward[] = [];

  ngOnInit(): void {
    if (this.dataRef.actionType !== this.statusAction.create) {
      this.loadData();
    } else {
      this.target.status = this.listStatus[0]['value'];
    }

    this.api.sysUserSelectAll().subscribe(res => {
      if (res.code === SUCCESS_RESPONSE) {
        this.lstUser = res.data;
      }
    });

    this.api.getListProvince().subscribe(res => {
      if (res.code === SUCCESS_RESPONSE) {
        this.lstTinh = res.data.results;
      }
    });
  }

  getListDistrict() {
    this.api.getListDistrict(this.target.maTinh).subscribe(res => {
      if (res.code === SUCCESS_RESPONSE) {
        this.lstHuyen = res.data.results;
        this.target.maHuyen = null;
        this.target.maXa = null;
      }
    });
  }

  getListWard() {
    this.api.getListWard(this.target.maHuyen).subscribe(res => {
      if (res.code === SUCCESS_RESPONSE) {
        this.lstXa = res.data.results;
        this.target.maXa = null;
      }
    });
  }

  loadData(): void {
    this.api.shopUserSelectOne(this.dataRef.key).subscribe((res) => {
      if (res.code === SUCCESS_RESPONSE) {
        this.target = res.data;
        this.target.createDate = this.target.createDate ? new ConvertDatePipe().transform(this.target.createDate) : null;
        this.getListDistrict();
        this.getListWard();
      } else {
        this.commonService.toastrDanger("Không tìm thấy dữ liệu !!!");
        this.closeDialog(false)
      }
    })
  }

  save(): void {
    this.target.createDate = this.target.createDate ? new Date(this.target.createDate) : null;
    this.target.updateDate = this.target.updateDate ? new Date(this.target.updateDate) : null;
    if (this.dataRef.actionType === STATUS_ACTION.create) {
      this.api.shopUserInsert(this.target).subscribe((res) => {
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
      this.api.shopUserUpdate(this.target).subscribe((res) => {
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
