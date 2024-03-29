import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuanTriHeThongRoutingModule } from './quan-tri-he-thong-routing.module';
import { NguoiDungComponent } from './nguoi-dung/nguoi-dung.component';
import { NguoiDungCreateComponent } from './nguoi-dung/nguoi-dung-create/nguoi-dung-create.component';
import { QuanLyShopComponent } from './quan-ly-shop/quan-ly-shop.component';
import { QuanLyShopCreateComponent } from './quan-ly-shop/quan-ly-shop-create/quan-ly-shop-create.component';
import { NhomNguoiDungComponent } from './nhom-nguoi-dung/nhom-nguoi-dung.component';
import { NhomNguoiDungCreateComponent } from './nhom-nguoi-dung/nhom-nguoi-dung-create/nhom-nguoi-dung-create.component';
import { NhomMenuNguoiDungComponent } from './nhom-menu-nguoi-dung/nhom-menu-nguoi-dung.component';
import { NhomMenuNguoiDungCreateComponent } from './nhom-menu-nguoi-dung/nhom-menu-nguoi-dung-create/nhom-menu-nguoi-dung-create.component';
import { QuanLyMenuComponent } from './quan-ly-menu/quan-ly-menu.component';
import { QuanLyMenuCreateComponent } from './quan-ly-menu/quan-ly-menu-create/quan-ly-menu-create.component';
import { NbCardModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NguoiDungComponent,
    NguoiDungCreateComponent,
    QuanLyShopComponent,
    QuanLyShopCreateComponent,
    NhomNguoiDungComponent,
    NhomNguoiDungCreateComponent,
    NhomMenuNguoiDungComponent,
    NhomMenuNguoiDungCreateComponent,
    QuanLyMenuComponent,
    QuanLyMenuCreateComponent
  ],
  imports: [
    CommonModule,
    ThemeModule,
    QuanTriHeThongRoutingModule,
    NbCardModule,
    NgSelectModule,
    FormsModule
  ]
})
export class QuanTriHeThongModule { }
