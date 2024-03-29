import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DanhMucChungRoutingModule } from './danh-muc-chung-routing.module';
import { DanhMucBaiVietComponent } from './danh-muc-bai-viet/danh-muc-bai-viet.component';
import { DanhMucBaiVietCreateComponent } from './danh-muc-bai-viet/danh-muc-bai-viet-create/danh-muc-bai-viet-create.component';
import { DanhMucSanPhamComponent } from './danh-muc-san-pham/danh-muc-san-pham.component';
import { DanhMucSanPhamCreateComponent } from './danh-muc-san-pham/danh-muc-san-pham-create/danh-muc-san-pham-create.component';
import { DanhMucTuDienComponent } from './danh-muc-tu-dien/danh-muc-tu-dien.component';
import { DanhMucTuDienCreateComponent } from './danh-muc-tu-dien/danh-muc-tu-dien-create/danh-muc-tu-dien-create.component';
import { ThemeModule } from '../../@theme/theme.module';
import { NbCardModule } from '@nebular/theme';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DanhMucBaiVietComponent,
    DanhMucBaiVietCreateComponent,
    DanhMucSanPhamComponent,
    DanhMucSanPhamCreateComponent,
    DanhMucTuDienComponent,
    DanhMucTuDienCreateComponent
  ],
  imports: [
    ThemeModule,
    DanhMucChungRoutingModule,
    NbCardModule,
    NgSelectModule,
    FormsModule
  ]
})
export class DanhMucChungModule { }
