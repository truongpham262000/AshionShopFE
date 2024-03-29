import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../../../../@core/customs/common.service';
import { STATUS_ACTION, SUCCESS_NOTICE, SUCCESS_RESPONSE } from '../../../../@core/customs/constants';
import { AshionShop, SysGroupMenuModel, SysGroupModel, SysMenuModel } from '../../../../@core/data/ashion-shop.service';

@Component({
  selector: 'ngx-nhom-menu-nguoi-dung-create',
  templateUrl: './nhom-menu-nguoi-dung-create.component.html',
  styleUrls: ['./nhom-menu-nguoi-dung-create.component.scss']
})
export class NhomMenuNguoiDungCreateComponent implements OnInit {
  constructor(
    private commonService: CommonService,
    private api: AshionShop,
    @Inject(MAT_DIALOG_DATA) public dataRef: { groupid: string,menuId: string, actionType: number },
    private dialogRef: MatDialogRef<NhomMenuNguoiDungCreateComponent>
  ) { }

  statusAction = STATUS_ACTION;
  titleHeader: string = "Nhóm menu người dùng";
  target: SysGroupMenuModel = new SysGroupMenuModel();
  lstGroupMenu: SysGroupModel[] = [];
  lstMenu: SysMenuModel[] = [];

  ngOnInit(): void {
    if(this.dataRef.actionType !== this.statusAction.create){
      this.loadData();
    }

    this.api.sysMenuSelectAll().subscribe(res => {
      if (res.code === SUCCESS_RESPONSE) {
        this.lstMenu = res.data;
      }
    });

    this.api.sysGroupSelectAll().subscribe(res => {
      if (res.code === SUCCESS_RESPONSE) {
        this.lstGroupMenu = res.data;
      }
    });

  }
  
  loadData(): void {
    this.api.sysGroupMenuSelectOne(this.dataRef.groupid, this.dataRef.menuId).subscribe((res) => {
      if(res.code === SUCCESS_RESPONSE){
        this.target = res.data;
      } else {
        this.commonService.toastrDanger("Không tìm thấy dữ liệu !!!");
        this.closeDialog(false)
      }
    })
  }

  save(): void {
    if(this.dataRef.actionType === STATUS_ACTION.create){
      this.api.sysGroupMenuInsert(this.target).subscribe((res) => {
        if(res.code === SUCCESS_RESPONSE){
          this.dialogRef.close(true);
          this.commonService.toastrSuccess(SUCCESS_NOTICE);
          this.loadData();
        } else {
          this.commonService.toastrDanger("Không thể thêm "+ this.titleHeader +" này !!!");
          this.dialogRef.close(false);
        }
      })
    } else {
      this.api.sysGroupMenuUpdate(this.target).subscribe((res) => {
        if(res.code === SUCCESS_RESPONSE){
          this.dialogRef.close(true);
          this.loadData();
          this.commonService.toastrSuccess(SUCCESS_NOTICE);
        } else {
          this.commonService.toastrDanger("Không thể cập nhật "+ this.titleHeader +" !!!");
          this.dialogRef.close(false);
        }
      })
    }
  }

  closeDialog(value){
    this.dialogRef.close(value)
  }
}
