import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../../../@core/customs/common.service';
import { PAGE_SIZE, STATUS_ACTION, SUCCESS_RESPONSE } from '../../../@core/customs/constants';
import { AshionShop, CommentErrorModelListPageModelView, PageModel } from '../../../@core/data/ashion-shop.service';
import { DialogConfirmComponent } from '../../../@theme/components/template/dialog/dialog-confirm/dialog-confirm.component';
import { QuanLyBinhLuanCreateComponent } from './quan-ly-binh-luan-create/quan-ly-binh-luan-create.component';

@Component({
  selector: 'ngx-quan-ly-binh-luan',
  templateUrl: './quan-ly-binh-luan.component.html',
  styleUrls: ['./quan-ly-binh-luan.component.scss']
})
export class QuanLyBinhLuanComponent implements OnInit{
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

  target: CommentErrorModelListPageModelView = new CommentErrorModelListPageModelView();

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.api.commentErrorPagingCommentError(this.pageModel).subscribe((res) => {
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
    this.dialog.open(QuanLyBinhLuanCreateComponent,
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
    this.dialog.open(QuanLyBinhLuanCreateComponent,
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
    this.dialog.open(QuanLyBinhLuanCreateComponent,
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
          message: `Bạn có chắc chắn xóa từ khóa <b>${title}</b> ?`,
          color: "text-warning",
          type: 1,
          icon: "exclamation-triangle",
          isAppend: true,
        })
      )
      .afterClosed()
      .subscribe((dialog) => {
        if (dialog) {
          this.api.commentErrorDelete(id).subscribe((res) => {
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
