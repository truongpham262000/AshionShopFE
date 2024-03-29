import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../../../@core/customs/common.service';
import { PAGE_SIZE, STATUS_ACTION, SUCCESS_RESPONSE } from '../../../@core/customs/constants';
import { AshionShop, PageModel, SysGroupModelListPageModelView } from '../../../@core/data/ashion-shop.service';
import { DialogConfirmComponent } from '../../../@theme/components/template/dialog/dialog-confirm/dialog-confirm.component';
import { NhomNguoiDungCreateComponent } from './nhom-nguoi-dung-create/nhom-nguoi-dung-create.component';

@Component({
  selector: 'ngx-nhom-nguoi-dung',
  templateUrl: './nhom-nguoi-dung.component.html',
  styleUrls: ['./nhom-nguoi-dung.component.scss']
})
export class NhomNguoiDungComponent implements OnInit {
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

  target: SysGroupModelListPageModelView = new SysGroupModelListPageModelView();

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.api.sysGroupPagingData(this.pageModel).subscribe((res) => {
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
    this.dialog.open(NhomNguoiDungCreateComponent,
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

  openDetailDialog(id: string) {
    this.dialog.open(NhomNguoiDungCreateComponent,
      this.commonService.configDialog("40%",
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
    this.dialog.open(NhomNguoiDungCreateComponent,
      this.commonService.configDialog("40%",
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
          message: `Bạn có chắc chắn xóa nhóm người dùng <b>${title}</b> ?`,
          color: "text-warning",
          type: 1,
          icon: "exclamation-triangle",
          isAppend: true,
        })
      )
      .afterClosed()
      .subscribe((dialog) => {
        if (dialog) {
          this.api.sysGroupDelete(id).subscribe((res) => {
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
