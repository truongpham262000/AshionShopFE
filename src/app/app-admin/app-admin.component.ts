import { Component } from '@angular/core';
import { MENU_ITEMS } from './menu';

@Component({
  selector: 'ngx-app-admin',
  templateUrl: './app-admin.component.html',
  styleUrls: ['./app-admin.component.scss']
})
export class AppAdminComponent {
  menu = MENU_ITEMS;
}
