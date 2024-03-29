import { Component, OnInit } from '@angular/core';
import { DialogConfirmComponent } from '../../../@theme/components/template/dialog/dialog-confirm/dialog-confirm.component';
import { PAGE_SIZE, STATUS_ACTION, SUCCESS_RESPONSE } from '../../../@core/customs/constants';
import { VoucherCreateComponent } from './voucher-create/voucher-create.component';
import { AshionShop, PageModel, VoucherModelListPageModelView } from '../../../@core/data/ashion-shop.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../../../@core/customs/common.service';

@Component({
  selector: 'ngx-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnInit {
  constructor(
    private api: AshionShop,
    private commonService: CommonService,
    private dialog: MatDialog
  ) { }
  pageModel: PageModel = new PageModel({
    search: null,
    pageSize: PAGE_SIZE,
    currentPage: 1,
  });
  target: VoucherModelListPageModelView = new VoucherModelListPageModelView();
  imageData: any;
  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.api.voucherPagingData(this.pageModel).subscribe((res) => {
      if (res.code === SUCCESS_RESPONSE) {
        this.target = res.data;
      } else {
        this.commonService.toastrDanger(res.message);
      }
    });
  }
  resetTextSearch() {
    this.pageModel.search = null;
    this.loadData();
  }
  openCreateDialog() {
    this.dialog.open(VoucherCreateComponent,
      this.commonService.configDialog("50%",
        {
          key: null,
          actionType: STATUS_ACTION.create
        })
      )
      .afterClosed()
      .subscribe(() => {
        this.loadData();
      })
  }
  openDetailDialog(id: string) {
    this.dialog.open(VoucherCreateComponent,
      this.commonService.configDialog("50%",
        {
          key: id,
          actionType: STATUS_ACTION.detail
        })
      )
      .afterClosed()
      .subscribe(() => {
        this.loadData();
      })
  }
  openEditDialog(id: string) {
    this.dialog.open(VoucherCreateComponent,
      this.commonService.configDialog("50%",
        {
          key: id,
          actionType: STATUS_ACTION.edit
        })
      )
      .afterClosed()
      .subscribe(() => {
        this.loadData();
      })
  }
  openDeleteDialog(id: string, title: string) {
    this.dialog
        .open(DialogConfirmComponent,
          this.commonService.configDialog("30%", {
            title: "Xác nhận",
            message: `Bạn có chắc chắn xóa phiếu giảm giá <b>${title}</b> ?`,
            color: "text-warning",
            type: 1,
            icon: "exclamation-triangle",
            isAppend: true,
          })
        )
        .afterClosed()
        .subscribe((dialog) => {
          if (dialog) {
            this.api.voucherDelete(id).subscribe((res) => {
              if (res.code === SUCCESS_RESPONSE) {
                this.commonService.toastrSuccess();
                this.loadData();
              } else {
                this.commonService.toastrDanger("Không xóa được !!!");
              }
            });
          }
        });
  }
}
