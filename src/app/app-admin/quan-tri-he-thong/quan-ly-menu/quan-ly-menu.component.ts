import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../../../@core/customs/common.service';
import { PAGE_SIZE, STATUS_ACTION, SUCCESS_RESPONSE } from '../../../@core/customs/constants';
import { AshionShop, PageModel, SysMenuModelListPageModelView } from '../../../@core/data/ashion-shop.service';
import { DialogConfirmComponent } from '../../../@theme/components/template/dialog/dialog-confirm/dialog-confirm.component';
import { QuanLyMenuCreateComponent } from './quan-ly-menu-create/quan-ly-menu-create.component';

@Component({
  selector: 'ngx-quan-ly-menu',
  templateUrl: './quan-ly-menu.component.html',
  styleUrls: ['./quan-ly-menu.component.scss']
})
export class QuanLyMenuComponent implements OnInit {
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

  target: SysMenuModelListPageModelView = new SysMenuModelListPageModelView();

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.api.sysMenuPagingData(this.pageModel).subscribe((res) => {
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
    this.dialog.open(QuanLyMenuCreateComponent,
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
    this.dialog.open(QuanLyMenuCreateComponent,
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
    this.dialog.open(QuanLyMenuCreateComponent,
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
          message: `Bạn có chắc chắn xóa menu <b>${title}</b> ?`,
          color: "text-warning",
          type: 1,
          icon: "exclamation-triangle",
          isAppend: true,
        })
      )
      .afterClosed()
      .subscribe((dialog) => {
        if (dialog) {
          this.api.sysMenuDelete(id).subscribe((res) => {
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
