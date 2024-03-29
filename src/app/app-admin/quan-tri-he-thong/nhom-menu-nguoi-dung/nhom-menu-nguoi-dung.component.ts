import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../../../@core/customs/common.service';
import { PAGE_SIZE, STATUS_ACTION, SUCCESS_RESPONSE } from '../../../@core/customs/constants';
import { AshionShop, PageModel, SysGroupMenuModelListPageModelView } from '../../../@core/data/ashion-shop.service';
import { DialogConfirmComponent } from '../../../@theme/components/template/dialog/dialog-confirm/dialog-confirm.component';
import { NhomMenuNguoiDungCreateComponent } from './nhom-menu-nguoi-dung-create/nhom-menu-nguoi-dung-create.component';

@Component({
  selector: 'ngx-nhom-menu-nguoi-dung',
  templateUrl: './nhom-menu-nguoi-dung.component.html',
  styleUrls: ['./nhom-menu-nguoi-dung.component.scss']
})
export class NhomMenuNguoiDungComponent implements OnInit {
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

  target: SysGroupMenuModelListPageModelView = new SysGroupMenuModelListPageModelView();

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.api.sysGroupMenuPagingData(this.pageModel).subscribe((res) => {
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
    this.dialog.open(NhomMenuNguoiDungCreateComponent,
      this.commonService.configDialog("40%",
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

  openDetailDialog(groupid: string, menuId: string) {
    this.dialog.open(NhomMenuNguoiDungCreateComponent,
      this.commonService.configDialog("40%",
        {
          groupid: groupid,
          menuId: menuId,
          actionType: STATUS_ACTION.detail
        })
      )
      .afterClosed()
      .subscribe(() => {
        this.loadData();
      })
  }

  openEditDialog(groupid: string, menuId: string) {
    this.dialog.open(NhomMenuNguoiDungCreateComponent,
      this.commonService.configDialog("40%",
        {
          groupid: groupid,
          menuId: menuId,
          actionType: STATUS_ACTION.edit
        })
      )
      .afterClosed()
      .subscribe(() => {
        this.loadData();
      })
  }

  openDeleteDialog(groupid: string, menuId: string, title: string) {
    this.dialog
        .open(DialogConfirmComponent,
          this.commonService.configDialog("30%", {
            title: "Xác nhận",
            message: `Bạn có chắc chắn xóa nhóm menu người dùng <b>${title}</b> ?`,
            color: "text-warning",
            type: 1,
            icon: "exclamation-triangle",
            isAppend: true,
          })
        )
        .afterClosed()
        .subscribe((dialog) => {
          if (dialog) {
            this.api.sysGroupMenuDelete(groupid,menuId).subscribe((res) => {
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
