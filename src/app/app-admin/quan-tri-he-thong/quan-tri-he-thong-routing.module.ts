import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NguoiDungComponent } from './nguoi-dung/nguoi-dung.component';
import { QuanLyShopComponent } from './quan-ly-shop/quan-ly-shop.component';
import { NhomNguoiDungComponent } from './nhom-nguoi-dung/nhom-nguoi-dung.component';
import { NhomMenuNguoiDungComponent } from './nhom-menu-nguoi-dung/nhom-menu-nguoi-dung.component';
import { QuanLyMenuComponent } from './quan-ly-menu/quan-ly-menu.component';

export const routes: Routes = [
  { path: 'nguoi-dung', component: NguoiDungComponent},
  { path: 'quan-ly-shop', component: QuanLyShopComponent},
  { path: 'nhom-nguoi-dung', component: NhomNguoiDungComponent},
  { path: 'nhom-menu-nguoi-dung', component: NhomMenuNguoiDungComponent},
  { path: 'quan-ly-menu', component: QuanLyMenuComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class QuanTriHeThongRoutingModule { }
