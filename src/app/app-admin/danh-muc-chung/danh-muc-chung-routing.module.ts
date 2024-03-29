import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DanhMucBaiVietComponent } from './danh-muc-bai-viet/danh-muc-bai-viet.component';
import { DanhMucSanPhamComponent } from './danh-muc-san-pham/danh-muc-san-pham.component';
import { DanhMucTuDienComponent } from './danh-muc-tu-dien/danh-muc-tu-dien.component';

export const routes: Routes = [
  { path: 'danh-muc-bai-viet', component: DanhMucBaiVietComponent},
  { path: 'danh-muc-san-pham', component: DanhMucSanPhamComponent},
  { path: 'danh-muc-tu-dien', component: DanhMucTuDienComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class DanhMucChungRoutingModule { }
