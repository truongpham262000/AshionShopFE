import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../../../@core/customs/common.service';
import { PAGE_SIZE, STATUS_ACTION, SUCCESS_RESPONSE, TYPE_DANHMUC } from '../../../@core/customs/constants';
import { AshionShop, CategoryModelListPageModelView, PageModel } from '../../../@core/data/ashion-shop.service';
import { DialogConfirmComponent } from '../../../@theme/components/template/dialog/dialog-confirm/dialog-confirm.component';
import { DanhMucBaiVietCreateComponent } from './danh-muc-bai-viet-create/danh-muc-bai-viet-create.component';

@Component({
  selector: 'ngx-danh-muc-bai-viet',
  templateUrl: './danh-muc-bai-viet.component.html',
  styleUrls: ['./danh-muc-bai-viet.component.scss']
})
export class DanhMucBaiVietComponent implements OnInit {
  constructor(
    private api: AshionShop,
    private commonService: CommonService,
    private dialog: MatDialog
  ) { }

  pageModel: PageModel = new PageModel({
    search: null,
    pageSize: PAGE_SIZE,
    currentPage: 1,
    type: TYPE_DANHMUC.BAI_VIET
  });

  target: CategoryModelListPageModelView = new CategoryModelListPageModelView();

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.api.categoryPagingCategory(this.pageModel).subscribe((res) => {
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
    this.dialog.open(DanhMucBaiVietCreateComponent,
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
    this.dialog.open(DanhMucBaiVietCreateComponent,
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
    this.dialog.open(DanhMucBaiVietCreateComponent,
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
          message: `Bạn có chắc chắn xóa danh mục <b>${title}</b> ?`,
          color: "text-warning",
          type: 1,
          icon: "exclamation-triangle",
          isAppend: true,
        })
      )
      .afterClosed()
      .subscribe((dialog) => {
        if (dialog) {
          this.api.categoryDelete(id).subscribe((res) => {
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
