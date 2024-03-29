import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonService, ConvertDatePipe } from '../../../../@core/customs/common.service';
import { STATUS_ACTION, LIST_STATUS, SUCCESS_RESPONSE, SUCCESS_NOTICE, TYPE_DANHMUC } from '../../../../@core/customs/constants';
import { AshionShop, CategoryModel, GroupSateModel, KhoSpModel, ShopUserModel } from '../../../../@core/data/ashion-shop.service';

@Component({
  selector: 'ngx-kho-hang-create',
  templateUrl: './kho-hang-create.component.html',
  styleUrls: ['./kho-hang-create.component.scss']
})
export class KhoHangCreateComponent implements OnInit {
  constructor(
    private commonService: CommonService,
    private api: AshionShop,
    @Inject(MAT_DIALOG_DATA) public dataRef:{ key: string, actionType: number },
    private dialogRef: MatDialogRef<KhoHangCreateComponent>
  ) { }

  statusAction = STATUS_ACTION;
  trangThai = LIST_STATUS;
  titleHeader: string = "Kho hàng";
  target: KhoSpModel = new KhoSpModel();
  listStatus: Object[] = [{text: "Đang sử dụng",value: 1},{text: "Không sử dụng", value: 0}];
  listWishlist: Object[] = [{text: "Sản phẩm yêu thích", value: 'SPYT'},{text: "Không phải phẩm yêu thích", value: 'KPSPYT'}];
  listCategory: CategoryModel[] = [];
  listCuaHang: ShopUserModel[] = [];
  lstColor: GroupSateModel[] = [];
  lstSize: GroupSateModel[] = [];
  codeProduct: string;
  listColor: string[] = [];
  listSize: string[] = [];

  async ngOnInit() {
    const colorState = await this.api.getListState("COLOR").toPromise();
    if(colorState.code === SUCCESS_RESPONSE) {
      this.lstColor = colorState.data;
    }

    const colorSize = await this.api.getListState("SIZE").toPromise();
    if(colorSize.code === SUCCESS_RESPONSE) {
      this.lstSize = colorSize.data;
    }

    const codeData = await this.api.getCodeProduct(1).toPromise();
    if(codeData.code === SUCCESS_RESPONSE) {
      this.codeProduct = codeData.data;
    }

    const dataCategopry = await this.api.categorySelectAll(TYPE_DANHMUC.PRODUCT).toPromise();
    if(dataCategopry.code === SUCCESS_RESPONSE) {
      this.listCategory = dataCategopry.data;
    }

    const dataShopUser = await this.api.shopUserSelectAll().toPromise();
    if(dataShopUser.code === SUCCESS_RESPONSE) {
      this.listCuaHang = dataShopUser.data;
    }

    const dataShippingCard = await this.api.shippingCardSelectAll().toPromise();
    if(dataShippingCard.code === SUCCESS_RESPONSE) {
      this.listCuaHang = dataShippingCard.data;
    }

    const dataKho = await this.api.khoSpSelectAll().toPromise();
    if(dataKho.code === SUCCESS_RESPONSE) {
      this.listCuaHang = dataKho.data;
    }

    if(this.dataRef.actionType !== this.statusAction.create){
      this.loadData();
    } else {
      this.target.image = null;
      this.target.maSp = this.codeProduct;
      this.target.status = this.listStatus[0]['value'];
      this.target.sanPhamYeuThich = this.listWishlist[1]['value'];
    }
  }
  
  loadData(): void {
    this.api.khoSpSelectOne(this.dataRef.key).subscribe((res) => {
      if(res.code === SUCCESS_RESPONSE){
        this.target = res.data;
        this.listColor = this.target.colorId.split(",");
        this.listSize = this.target.sizeId.split(",");
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
    this.target.colorId = this.listColor.toString();
    this.target.sizeId = this.listSize.toString();
    if(this.dataRef.actionType === STATUS_ACTION.create){
      this.api.khoSpInsert(this.target).subscribe((res) => {
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
      this.api.khoSpUpdate(this.target).subscribe((res) => {
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

  currencyMaskConfig = {
    align: "left",
    decimal: ",",
    precision: 0,
    prefix: "",
    suffix: "",
    thousands: "."
  };

  handleUpload(event: any){
    const files = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onload = () => {
      this.target.image = reader.result.toString();
    };
  }

  @ViewChild('avatar') avatar: ElementRef;
  DeleteImg(){
    this.target.image = null;
    let input = <HTMLInputElement>document.getElementById("loadImage");
    input.value = null;
  }

  closeDialog(value){
    this.dialogRef.close(value)
  }
}
