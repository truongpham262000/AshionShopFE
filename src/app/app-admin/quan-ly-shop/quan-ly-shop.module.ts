import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuanLyShopRoutingModule } from './quan-ly-shop-routing.module';
import { QuanLyDonHangComponent } from './quan-ly-don-hang/quan-ly-don-hang.component';
import { QuanLyDonHangCreateComponent } from './quan-ly-don-hang/quan-ly-don-hang-create/quan-ly-don-hang-create.component';
import { SanPhamComponent } from './san-pham/san-pham.component';
import { SanPhamCreateComponent } from './san-pham/san-pham-create/san-pham-create.component';
import { KhoHangComponent } from './kho-hang/kho-hang.component';
import { KhoHangCreateComponent } from './kho-hang/kho-hang-create/kho-hang-create.component';
import { VoucherComponent } from './voucher/voucher.component';
import { VoucherCreateComponent } from './voucher/voucher-create/voucher-create.component';
import { ThemeModule } from '../../@theme/theme.module';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { IconsModule } from '@progress/kendo-angular-icons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { LayoutModule } from "@progress/kendo-angular-layout";


@NgModule({
  declarations: [
    QuanLyDonHangComponent,
    QuanLyDonHangCreateComponent,
    SanPhamComponent,
    SanPhamCreateComponent,
    KhoHangComponent,
    KhoHangCreateComponent,
    VoucherComponent,
    VoucherCreateComponent
  ],
  imports: [
    CommonModule,
    ThemeModule,
    NbCardModule,
    FormsModule,
    QuanLyShopRoutingModule,
    NgSelectModule,
    CurrencyMaskModule,
    LayoutModule,
    IconsModule,
    InputsModule,
    LabelModule,
    ButtonsModule,
    DropDownsModule,
  ]
})
export class QuanLyShopModule { }
