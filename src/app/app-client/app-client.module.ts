import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../@theme/theme.module';
import { AppClientRoutingModule } from './app-client-routing.module';
import { AppClientComponent } from './app-client.component';
import { AppClientShopComponent } from './app-client-shop/app-client-shop.component';
import { AppClientBlogComponent } from './app-client-blog/app-client-blog.component';
import { AppClientBlogDetailComponent } from './app-client-blog/app-client-blog-detail/app-client-blog-detail.component';
import { AppClientShopDetailComponent } from './app-client-shop/app-client-shop-detail/app-client-shop-detail.component';
import { AppClientContactComponent } from './app-client-contact/app-client-contact.component';



@NgModule({
  declarations: [
    AppClientComponent,
    AppClientShopComponent,
    AppClientBlogComponent,
    AppClientBlogDetailComponent,
    AppClientShopDetailComponent,
    AppClientContactComponent
  ],
  imports: [
    CommonModule,
    ThemeModule,
    AppClientRoutingModule
  ]
})
export class AppClientModule { }
