import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../../../@core/customs/common.service';
import { PAGE_SIZE, STATUS_ACTION, SUCCESS_RESPONSE } from '../../../@core/customs/constants';
import { AshionShop, PageModel, SysUserModelListPageModelView } from '../../../@core/data/ashion-shop.service';
import { DialogConfirmComponent } from '../../../@theme/components/template/dialog/dialog-confirm/dialog-confirm.component';
import { NguoiDungCreateComponent } from './nguoi-dung-create/nguoi-dung-create.component';

@Component({
  selector: 'ngx-nguoi-dung',
  templateUrl: './nguoi-dung.component.html',
  styleUrls: ['./nguoi-dung.component.scss']
})
export class NguoiDungComponent implements OnInit {
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

  target: SysUserModelListPageModelView = new SysUserModelListPageModelView();

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.api.sysUserPagingUser(this.pageModel).subscribe((res) => {
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
    this.dialog.open(NguoiDungCreateComponent,
      this.commonService.configDialog("80%",
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
    this.dialog.open(NguoiDungCreateComponent,
      this.commonService.configDialog("80%",
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
    this.dialog.open(NguoiDungCreateComponent,
      this.commonService.configDialog("80%",
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
            message: `Bạn có chắc chắn xóa người dùng <b>${title}</b> ?`,
            color: "text-warning",
            type: 1,
            icon: "exclamation-triangle",
            isAppend: true,
          })
        )
        .afterClosed()
        .subscribe((dialog) => {
          if (dialog) {
            this.api.sysUserDelete(id).subscribe((res) => {
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
