import { AppAdminRoutingModule } from "./app-admin-routing.module";
import { NgModule } from "@angular/core";
import { ThemeModule } from "../@theme/theme.module";
import { AppAdminComponent } from "./app-admin.component";
import { CommonModule } from "@angular/common";
import { NbMenuModule } from "@nebular/theme";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { TrangChuModule } from "./trang-chu/trang-chu.module";
import { NgSelectModule } from "@ng-select/ng-select";
import { QuanTriHeThongModule } from "./quan-tri-he-thong/quan-tri-he-thong.module";
import { DanhMucChungModule } from "./danh-muc-chung/danh-muc-chung.module";
import { QuanLyShopModule } from "./quan-ly-shop/quan-ly-shop.module";

@NgModule({
  declarations: [AppAdminComponent, DashboardComponent],
  imports: [
    ThemeModule,
    AppAdminRoutingModule,
    NbMenuModule,
    TrangChuModule,
    NgSelectModule,
    QuanTriHeThongModule,
    DanhMucChungModule,
    QuanLyShopModule
  ],
})
export class AppAdminModule {}
