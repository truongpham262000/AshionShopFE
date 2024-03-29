import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { LIST_STATUS, STATUS_ACTION, SUCCESS_NOTICE, SUCCESS_RESPONSE, TYPE_DANHMUC } from '../../../../@core/customs/constants';
import { CommonService, ConvertDatePipe } from '../../../../@core/customs/common.service';
import { AshionShop, CategoryModel, KhoSpModel, ProductModel, ShippingCardModel, ShopUserModel } from '../../../../@core/data/ashion-shop.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ngx-san-pham-create',
  templateUrl: './san-pham-create.component.html',
  styleUrls: ['./san-pham-create.component.scss']
})
export class SanPhamCreateComponent implements OnInit {
  constructor(
    private commonService: CommonService,
    private api: AshionShop,
    @Inject(MAT_DIALOG_DATA) public dataRef:{ key: string, actionType: number },
    private dialogRef: MatDialogRef<SanPhamCreateComponent>
  ) { }

  statusAction = STATUS_ACTION;
  trangThai = LIST_STATUS;
  titleHeader: string = "sản phẩm giỏ hàng";
  target: ProductModel = new ProductModel();
  listStatus: Object[] = [{text: "Đang sử dụng",value: 1},{text: "Không sử dụng", value: 0}];
  listWishlist: Object[] = [{text: "Sản phẩm yêu thích", value: 'SPYT'},{text: "Không phải phẩm yêu thích", value: 'KPSPYT'}];
  listCategory: CategoryModel[] = [];
  listCuaHang: ShopUserModel[] = [];
  lstShippingCard: ShippingCardModel[] = [];
  lstKhoSp: KhoSpModel[] = [];

  async ngOnInit() {
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
      this.lstKhoSp = dataKho.data;
    }

    if(this.dataRef.actionType !== this.statusAction.create){
      this.loadData();
    } else {
      this.target.image = null;
      this.target.status = this.listStatus[0]['value'];
      this.target.sanPhamYeuThich = this.listWishlist[1]['value'];
    }
  }
  
  loadData(): void {
    this.api.productSelectOne(this.dataRef.key).subscribe((res) => {
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
      this.api.productInsert(this.target).subscribe((res) => {
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
      this.api.productUpdate(this.target).subscribe((res) => {
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
