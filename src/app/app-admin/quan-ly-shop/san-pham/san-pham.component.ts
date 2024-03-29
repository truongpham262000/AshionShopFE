import { Component, OnInit } from '@angular/core';
import { PAGE_SIZE, STATUS_ACTION, SUCCESS_RESPONSE } from '../../../@core/customs/constants';
import { DialogConfirmComponent } from '../../../@theme/components/template/dialog/dialog-confirm/dialog-confirm.component';
import { SanPhamCreateComponent } from './san-pham-create/san-pham-create.component';
import { AshionShop, PageModel, ProductModelListPageModelView } from '../../../@core/data/ashion-shop.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../../../@core/customs/common.service';

@Component({
  selector: 'ngx-san-pham',
  templateUrl: './san-pham.component.html',
  styleUrls: ['./san-pham.component.scss']
})
export class SanPhamComponent implements OnInit {
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

  target: ProductModelListPageModelView = new ProductModelListPageModelView();

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.api.productPagingData(this.pageModel).subscribe((res) => {
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
    this.dialog.open(SanPhamCreateComponent,
      this.commonService.configDialog("60%",
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
    this.dialog.open(SanPhamCreateComponent,
      this.commonService.configDialog("60%",
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
    this.dialog.open(SanPhamCreateComponent,
      this.commonService.configDialog("60%",
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
            message: `Bạn có chắc chắn xóa Header <b>${title}</b> ?`,
            color: "text-warning",
            type: 1,
            icon: "exclamation-triangle",
            isAppend: true,
          })
        )
        .afterClosed()
        .subscribe((dialog) => {
          if (dialog) {
            this.api.productDelete(id).subscribe((res) => {
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
