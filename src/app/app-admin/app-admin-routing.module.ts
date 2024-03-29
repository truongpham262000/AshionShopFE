import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppAdminComponent } from './app-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { routes as TrangChuRouter } from './trang-chu/trang-chu-routing.module';
import { routes as QuanLyShopRouter } from './quan-ly-shop/quan-ly-shop-routing.module';
import { routes as DanhMucChungRouter } from './danh-muc-chung/danh-muc-chung-routing.module';
import { routes as QuanTriHeThongRouter } from './quan-tri-he-thong/quan-tri-he-thong-routing.module';

const routes: Routes = [
  {
    path: '',
    component: AppAdminComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'trang-chu', children: TrangChuRouter },
      { path: 'quan-ly-shop', children: QuanLyShopRouter },
      { path: 'danh-muc-chung', children: DanhMucChungRouter },
      { path: 'quan-tri-he-thong', children: QuanTriHeThongRouter },
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AppAdminRoutingModule { }
