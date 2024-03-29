import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { TrangChuHeaderComponent } from "./trang-chu-header/trang-chu-header.component";
import { TrangChuFooterComponent } from "./trang-chu-footer/trang-chu-footer.component";
import { BaiVietComponent } from "./bai-viet/bai-viet.component";
import { SliderComponent } from "./slider/slider.component";
import { FeedbackComponent } from "./feedback/feedback.component";
import { BinhLuanComponent } from "./binh-luan/binh-luan.component";
import { QuanLyBinhLuanComponent } from "./quan-ly-binh-luan/quan-ly-binh-luan.component";

export const routes: Routes = [
  { path: "header", component: TrangChuHeaderComponent },
  { path: "footer", component: TrangChuFooterComponent },
  { path: "bai-viet", component: BaiVietComponent },
  { path: "slider", component: SliderComponent },
  { path: "feedback", component: FeedbackComponent },
  { path: "binh-luan", component: BinhLuanComponent },
  { path: "quan-ly-binh-luan", component: QuanLyBinhLuanComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrangChuRoutingModule {}
