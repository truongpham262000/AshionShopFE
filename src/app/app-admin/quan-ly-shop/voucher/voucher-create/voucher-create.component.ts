import { Component, Inject, OnInit } from '@angular/core';
import { LIST_STATUS, STATUS_ACTION, SUCCESS_NOTICE, SUCCESS_RESPONSE } from '../../../../@core/customs/constants';
import { CommonService, ConvertDatePipe } from '../../../../@core/customs/common.service';
import { AshionShop, VoucherModel } from '../../../../@core/data/ashion-shop.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CurrencyMaskConfig } from 'ng2-currency-mask';

@Component({
  selector: 'ngx-voucher-create',
  templateUrl: './voucher-create.component.html',
  styleUrls: ['./voucher-create.component.scss']
})
export class VoucherCreateComponent implements OnInit{
  constructor(
    private commonService: CommonService,
    private api: AshionShop,
    @Inject(MAT_DIALOG_DATA) public dataRef: { key: string, actionType: number },
    private dialogRef: MatDialogRef<VoucherCreateComponent>
  ) { }

  statusAction = STATUS_ACTION;
  lstStatus = LIST_STATUS;
  titleHeader: string = "Mã giảm giá";
  target: VoucherModel = new VoucherModel();

  ngOnInit(): void {
    if (this.dataRef.actionType !== this.statusAction.create) {
      this.loadData();
    } else {
      this.target.trangThai = 1;
      this.target.startDate = new ConvertDatePipe().transform(new Date());
      this.target.endDate = new ConvertDatePipe().transform(new Date().setDate(new Date().getDate() + 1));
    }

  }

  currencyMaskConfig = {
    align: "left",
    decimal: ",",
    precision: 0,
    prefix: "",
    suffix: "",
    thousands: "."
  };

  loadData(): void {
    this.api.voucherSelectOne(this.dataRef.key).subscribe((res) => {
      if (res.code === SUCCESS_RESPONSE) {
        this.target = res.data;
        this.target.startDate = new ConvertDatePipe().transform(this.target.startDate);
        this.target.endDate = new ConvertDatePipe().transform(this.target.endDate);
      } else {
        this.commonService.toastrDanger("Không tìm thấy dữ liệu !!!");
        this.closeDialog(false)
      }
    })
  }

  save(): void {
      this.target.startDate = this.target.startDate != null ? new Date(this.target.startDate) : new Date();
      this.target.endDate = this.target.endDate != null ? new Date(this.target.endDate) : new Date();
    if (this.dataRef.actionType === STATUS_ACTION.create) {
      this.api.voucherInsert(this.target).subscribe((res) => {
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
      this.api.voucherUpdate(this.target).subscribe((res) => {
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
