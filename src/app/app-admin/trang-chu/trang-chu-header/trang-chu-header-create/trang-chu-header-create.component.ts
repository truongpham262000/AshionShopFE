import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService, ConvertDatePipe } from '../../../../@core/customs/common.service';
import { LIST_STATUS, STATUS_ACTION, SUCCESS_NOTICE, SUCCESS_RESPONSE } from '../../../../@core/customs/constants';
import { AshionShop, HeaderModel } from '../../../../@core/data/ashion-shop.service';

@Component({
  selector: 'ngx-trang-chu-header-create',
  templateUrl: './trang-chu-header-create.component.html',
  styleUrls: ['./trang-chu-header-create.component.scss']
})
export class TrangChuHeaderCreateComponent implements OnInit {

  constructor(
    private commonService: CommonService,
    private api: AshionShop,
    @Inject(MAT_DIALOG_DATA) public dataRef:{ key: string, actionType: number },
    private dialogRef: MatDialogRef<TrangChuHeaderCreateComponent>
  ) { }

  statusAction = STATUS_ACTION;
  trangThai = LIST_STATUS;
  titleHeader: string = "Design Header shop";
  target: HeaderModel = new HeaderModel();
  listStatus: Object[] = [{text: "Đang sử dụng",value: 1},{text: "Không sử dụng", value: 0}];
  listCategory: any[];

  ngOnInit(): void {
    if(this.dataRef.actionType !== this.statusAction.create){
      this.loadData();
    } else {
      this.target.imageLogo = null;
      this.target.trangThai = this.listStatus[0]['value'];
    }
  }
  
  loadData(): void {
    this.api.headerSelectOne(this.dataRef.key).subscribe((res) => {
      if(res.code === SUCCESS_RESPONSE){
        this.target = res.data;
        this.target.createDate = this.target.createDate ? new ConvertDatePipe().transform(this.target.createDate) : null;
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
      this.api.headerInsert(this.target).subscribe((res) => {
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
      this.api.headerUpdate(this.target).subscribe((res) => {
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

  handleUpload(event: any){
    const files = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onload = () => {
      this.target.imageLogo = reader.result.toString();
    };
  }

  @ViewChild('avatar') avatar: ElementRef;
  DeleteImg(){
    this.target.imageLogo = null;
    let input = <HTMLInputElement>document.getElementById("loadImage");
    input.value = null;
  }

  closeDialog(value){
    this.dialogRef.close(value)
  }
}
