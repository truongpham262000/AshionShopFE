import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppClientComponent } from './app-client.component';
import { AppClientIndexComponent } from './app-client-index/app-client-index.component';
import { AppClientShopComponent } from './app-client-shop/app-client-shop.component';
import { AppClientBlogComponent } from './app-client-blog/app-client-blog.component';
import { AppClientBlogDetailComponent } from './app-client-blog/app-client-blog-detail/app-client-blog-detail.component';
import { AppClientShopDetailComponent } from './app-client-shop/app-client-shop-detail/app-client-shop-detail.component';
import { AppClientContactComponent } from './app-client-contact/app-client-contact.component';

const routes: Routes = [
  {
    path: '',
    component: AppClientComponent,
    children: [
      { path: '', component: AppClientIndexComponent },
      { path: 'shop', component: AppClientShopComponent },
      { path: 'shop/shop-detail', component: AppClientShopDetailComponent },
      { path: 'blog', component: AppClientBlogComponent },
      { path: 'blog/blog-detail', component: AppClientBlogDetailComponent },
      { path: 'contact', component: AppClientContactComponent },
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
export class AppClientRoutingModule { }
