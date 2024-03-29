import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TrangChuHeaderComponent } from "./trang-chu-header/trang-chu-header.component";
import { TrangChuHeaderCreateComponent } from "./trang-chu-header/trang-chu-header-create/trang-chu-header-create.component";
import { TrangChuRoutingModule } from "./trang-chu-routing.module";
import { TrangChuFooterComponent } from "./trang-chu-footer/trang-chu-footer.component";
import { TrangChuFooterCreateComponent } from "./trang-chu-footer/trang-chu-footer-create/trang-chu-footer-create.component";
import { BaiVietComponent } from "./bai-viet/bai-viet.component";
import { BaiVietCreateComponent } from "./bai-viet/bai-viet-create/bai-viet-create.component";
import { SliderComponent } from "./slider/slider.component";
import { SliderCreateComponent } from "./slider/slider-create/slider-create.component";
import { FeedbackComponent } from "./feedback/feedback.component";
import { FeedbackCreateComponent } from "./feedback/feedback-create/feedback-create.component";
import { BinhLuanComponent } from "./binh-luan/binh-luan.component";
import { BinhLuanCreateComponent } from "./binh-luan/binh-luan-create/binh-luan-create.component";
import { QuanLyBinhLuanComponent } from "./quan-ly-binh-luan/quan-ly-binh-luan.component";
import { QuanLyBinhLuanCreateComponent } from "./quan-ly-binh-luan/quan-ly-binh-luan-create/quan-ly-binh-luan-create.component";
import { NbCardModule } from "@nebular/theme";
import { ThemeModule } from "../../@theme/theme.module";
import { EditorModule } from "@progress/kendo-angular-editor";
import { MatDialogModule } from "@angular/material/dialog";
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
  declarations: [
    TrangChuHeaderComponent,
    TrangChuHeaderCreateComponent,
    TrangChuFooterComponent,
    TrangChuFooterCreateComponent,
    BaiVietComponent,
    BaiVietCreateComponent,
    SliderComponent,
    SliderCreateComponent,
    FeedbackComponent,
    FeedbackCreateComponent,
    BinhLuanComponent,
    BinhLuanCreateComponent,
    QuanLyBinhLuanComponent,
    QuanLyBinhLuanCreateComponent,
  ],
  imports: [
    CommonModule,
    TrangChuRoutingModule,
    ThemeModule,
    NbCardModule,
    EditorModule,
    MatDialogModule,
    NgSelectModule
  ],
})
export class TrangChuModule {}
