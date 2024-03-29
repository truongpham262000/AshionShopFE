import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { QuanLyDonHangComponent } from './quan-ly-don-hang/quan-ly-don-hang.component';
import { SanPhamComponent } from './san-pham/san-pham.component';
import { KhoHangComponent } from './kho-hang/kho-hang.component';
import { VoucherComponent } from './voucher/voucher.component';

export const routes: Routes = [
  { path: 'quan-ly-don-hang', component: QuanLyDonHangComponent },
  { path: 'san-pham', component: SanPhamComponent },
  { path: 'kho-hang', component: KhoHangComponent },
  { path: 'voucher', component: VoucherComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class QuanLyShopRoutingModule { }
