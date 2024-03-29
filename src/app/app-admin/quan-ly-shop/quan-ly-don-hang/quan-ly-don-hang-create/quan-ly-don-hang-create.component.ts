import { Component, Inject, OnInit } from '@angular/core';
import { LIST_STATUS, STATUS_ACTION, SUCCESS_NOTICE, SUCCESS_RESPONSE } from '../../../../@core/customs/constants';
import { CommonService, ConvertDatePipe } from '../../../../@core/customs/common.service';
import { AshionShop, GroupSateModel, List_DistrictData, List_ProvinceData, List_WardData, ShippingCardModel, ShopUserModel, VoucherModel } from '../../../../@core/data/ashion-shop.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ngx-quan-ly-don-hang-create',
  templateUrl: './quan-ly-don-hang-create.component.html',
  styleUrls: ['./quan-ly-don-hang-create.component.scss']
})
export class QuanLyDonHangCreateComponent implements OnInit {
  constructor(
    private commonService: CommonService,
    private api: AshionShop,
    @Inject(MAT_DIALOG_DATA) public dataRef: { key: string, actionType: number },
    private dialogRef: MatDialogRef<QuanLyDonHangCreateComponent>
  ) { }

  statusAction = STATUS_ACTION;
  lstStatus = LIST_STATUS;
  titleHeader: string = "đơn hàng";
  target: ShippingCardModel = new ShippingCardModel();
  lstShop: ShopUserModel[] = [];
  lstStatusOrder: GroupSateModel[] = [];
  lstTinh: List_ProvinceData[] = [];
  lstHuyen: List_DistrictData[] = [];
  lstXa: List_WardData[] = [];

  async ngOnInit() {
    const lstshop = await this.api.shopUserSelectAll().toPromise();
    if(lstshop.code === SUCCESS_RESPONSE) {
      this.lstShop = lstshop.data;
    }

    const lststatus = await this.api.getListState("ORDER").toPromise();
    if(lststatus.code === SUCCESS_RESPONSE) {
      this.lstStatusOrder = lststatus.data;
    }

    if (this.dataRef.actionType !== this.statusAction.create) {
      this.loadData();
    } else {
      this.target.createDate = new ConvertDatePipe().transform(new Date());
    }

    this.api.getListProvince().subscribe(res => {
      if (res.code === SUCCESS_RESPONSE) {
        this.lstTinh = res.data.results;
      }
    });
  }

  currencyMaskConfig = {
    align: "left",
    decimal: ",",
    precision: 0,
    prefix: "",
    suffix: "",
    thousands: "."
  };

  tennguoigui: string = "";
  changeGui() {
    const shopInfor = this.lstShop.find(x => x.shopId === this.target.shopId);
    this.tennguoigui = shopInfor.nameShop;
    this.target.guiTinh = shopInfor.maTinh;
    this.target.guiHuyen = shopInfor.maHuyen;
    this.target.guiXa = shopInfor.maXa;
    this.target.guiDiaChi = shopInfor.diaChi;
    this.getListDistrict();
    this.getListWard();
  }

  loadData(): void {
    this.api.shippingCardSelectOne(this.dataRef.key).subscribe((res) => {
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
      this.api.shippingCardInsert(this.target).subscribe((res) => {
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
      this.api.shippingCardUpdate(this.target).subscribe((res) => {
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

  getListDistrict() {
    this.api.getListDistrict(this.target.guiTinh).subscribe(res => {
      if (res.code === SUCCESS_RESPONSE) {
        this.lstHuyen = res.data.results;
        if (!this.target.guiTinh) {
          this.target.guiHuyen = null;
          this.target.guiXa = null;
        }
      }
    });
  }

  getListWard() {
    this.api.getListWard(this.target.guiHuyen).subscribe(res => {
      if (res.code === SUCCESS_RESPONSE) {
        this.lstXa = res.data.results;
        if (!this.target.guiXa) {
          this.target.guiXa = null;
        }
      }
    });
  }

  closeDialog(value) {
    this.dialogRef.close(value)
  }
}
