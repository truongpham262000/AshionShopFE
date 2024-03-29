import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService, ConvertDatePipe } from '../../../../@core/customs/common.service';
import { LIST_ACTIVE_USER, LIST_GENDER, LIST_STATUS, LIST_STATUS_USER, STATUS_ACTION, SUCCESS_NOTICE, SUCCESS_RESPONSE } from '../../../../@core/customs/constants';
import { AshionShop, List_District, List_Province, List_Ward, SysUserModel } from '../../../../@core/data/ashion-shop.service';

@Component({
  selector: 'ngx-nguoi-dung-create',
  templateUrl: './nguoi-dung-create.component.html',
  styleUrls: ['./nguoi-dung-create.component.scss']
})
export class NguoiDungCreateComponent implements OnInit {
  constructor(
    private commonService: CommonService,
    private api: AshionShop,
    @Inject(MAT_DIALOG_DATA) public dataRef:{ key: string, actionType: number },
    private dialogRef: MatDialogRef<NguoiDungCreateComponent>
  ) { }

  statusAction = STATUS_ACTION;
  trangThai = LIST_STATUS;
  titleHeader: string = "Thông tin người dùng";
  target: SysUserModel = new SysUserModel();
  listStatus = LIST_STATUS_USER;
  listActive = LIST_ACTIVE_USER;
  lstGenDer = LIST_GENDER;
  listCategory: any[];
  lstTinh: List_Province[] = [];
  lstHuyen: List_District[] = [];
  lstXa: List_Ward[] = [];

  ngOnInit(): void {
    if(this.dataRef.actionType !== this.statusAction.create){
      this.loadData();
    } else {
      this.target.trangThai = this.listStatus[0]['value'];
    }

    this.api.getListProvince().subscribe(res => {
      if (res.code === SUCCESS_RESPONSE) {
        this.lstTinh = res.data.results;
      }
    });
  }

  getListDistrict() {
    this.api.getListDistrict(this.target.maTinh).subscribe(res => {
      if (res.code === SUCCESS_RESPONSE) {
        this.lstHuyen = res.data.results;
        if (!this.target.maTinh) {
          this.target.maHuyen = null;
          this.target.maXa = null;
        }
      }
    });
  }

  getListWard() {
    this.api.getListWard(this.target.maHuyen).subscribe(res => {
      if (res.code === SUCCESS_RESPONSE) {
        this.lstXa = res.data.results;
        if (!this.target.maHuyen) {
          this.target.maXa = null;
        }
      }
    });
  }
  
  loadData(): void {
    this.api.sysUserSelectOne(this.dataRef.key).subscribe((res) => {
      if(res.code === SUCCESS_RESPONSE){
        this.target = res.data;
        this.target.createDate = this.target.createDate ? new ConvertDatePipe().transform(this.target.createDate) : null;
        this.getListDistrict();
        this.getListWard();
      } else {
        this.commonService.toastrDanger("Không tìm thấy dữ liệu !!!");
        this.closeDialog(false)
      }
    })
  }

  save(): void {
    this.target.createDate = this.target.createDate ? new Date(this.target.createDate) : null;
    this.target.updateDate = this.target.updateDate ? new Date(this.target.updateDate) : null;
    if(this.dataRef.actionType === STATUS_ACTION.create){
      this.api.sysUserInsert(this.target).subscribe((res) => {
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
      this.api.sysUserUpdate(this.target).subscribe((res) => {
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

  showPass = true;
  setTypeInput = "password";
  setEyePassword() {
    this.showPass = !this.showPass;
    if(this.showPass === false) {
      this.setTypeInput = "text";
    } else {
      this.setTypeInput = "password";
    }
  }

  closeDialog(value){
    this.dialogRef.close(value)
  }
}
