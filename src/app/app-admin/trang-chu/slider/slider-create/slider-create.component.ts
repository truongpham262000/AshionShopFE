import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService, ConvertDatePipe } from '../../../../@core/customs/common.service';
import { LIST_STATUS, STATUS_ACTION, SUCCESS_NOTICE, SUCCESS_RESPONSE } from '../../../../@core/customs/constants';
import { AshionShop, SliderModel } from '../../../../@core/data/ashion-shop.service';

@Component({
  selector: 'ngx-slider-create',
  templateUrl: './slider-create.component.html',
  styleUrls: ['./slider-create.component.scss']
})
export class SliderCreateComponent implements OnInit {
  constructor(
    private commonService: CommonService,
    private api: AshionShop,
    @Inject(MAT_DIALOG_DATA) public dataRef: { key: string, actionType: number },
    private dialogRef: MatDialogRef<SliderCreateComponent>
  ) { }

  statusAction = STATUS_ACTION;
  trangThai = LIST_STATUS;
  titleHeader: string = "Slider";
  target: SliderModel = new SliderModel();
  listStatus: Object[] = [{ text: "Đang sử dụng", value: 1 }, { text: "Không sử dụng", value: 0 }];
  listCategory: any[];
  imageData: any;

  ngOnInit(): void {
    if (this.dataRef.actionType !== this.statusAction.create) {
      this.loadData();
    } else {
      this.imageData = null;
      this.target.status = this.listStatus[0]['value'];
    }
  }

  loadData(): void {
    this.api.sliderSelectOne(this.dataRef.key).subscribe((res) => {
      if (res.code === SUCCESS_RESPONSE) {
        this.target = res.data;
        this.target.createDate = this.target.createDate ? new ConvertDatePipe().transform(this.target.createDate) : null;
        this.imageData = this.target.image;
      } else {
        this.commonService.toastrDanger("Không tìm thấy dữ liệu !!!");
        this.closeDialog(false)
      }
    })
  }

  save(): void {
    this.target.createDate = this.target.createDate ? new Date(this.target.createDate) : null;
    this.target.updateDate = this.target.updateDate ? new Date(this.target.updateDate) : null;
    if (this.dataRef.actionType === STATUS_ACTION.create) {
      this.api.sliderInsert(this.target).subscribe((res) => {
        if (res.code === SUCCESS_RESPONSE) {
          this.dialogRef.close(true);
          this.commonService.toastrSuccess(SUCCESS_NOTICE);
          this.loadData();
        } else {
          this.commonService.toastrDanger("Không thể thêm " + this.titleHeader + " này !!!");
          this.dialogRef.close(false);
        }
      })
    } else {
      this.api.sliderUpdate(this.target).subscribe((res) => {
        if (res.code === SUCCESS_RESPONSE) {
          this.dialogRef.close(true);
          this.loadData();
          this.commonService.toastrSuccess(SUCCESS_NOTICE);
        } else {
          this.commonService.toastrDanger("Không thể cập nhật " + this.titleHeader + " !!!");
          this.dialogRef.close(false);
        }
      })
    }
  }

  handleUpload(event: any) {
    const files = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onload = () => {
      this.imageData = reader.result.toString();
      this.target.image = this.imageData;
    };
  }

  @ViewChild('avatar') avatar: ElementRef;
  DeleteImg() {
    this.imageData = null;
    let input = <HTMLInputElement>document.getElementById("loadImage");
    input.value = null;
  }

  closeDialog(value) {
    this.dialogRef.close(value)
  }
}
