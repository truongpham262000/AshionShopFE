import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AshionShop, SysUserModel } from '../../../@core/data/ashion-shop.service';
import { CommonService } from '../../../@core/customs/common.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { STATUS_ACTION, SUCCESS_NOTICE, SUCCESS_RESPONSE } from '../../../@core/customs/constants';
import { NguoiDungCreateComponent } from '../../../app-admin/quan-tri-he-thong/nguoi-dung/nguoi-dung-create/nguoi-dung-create.component';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Sáng',
    },
    {
      value: 'dark',
      name: 'Tối',
    },
  ];

  currentTheme = 'default';

  userMenu = [{ title: 'Thông tin người dùng' }, { title: 'Đổi mật khẩu' }, { title: 'Đăng xuất' }];
  
  target: SysUserModel = new SysUserModel();

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private api: AshionShop,
    private commonService: CommonService,
    private dialog: MatDialog,
    private router: Router,
    private service: AshionShop
  ) {}

  ngOnInit() {
    this.target = JSON.parse(localStorage.getItem('User'));
    if(this.target === null ||  this.target.trangThai === 0){
      this.router.navigateByUrl("/");
    } else {
      this.menuService.onItemClick().subscribe(title => {
        if(title.item.title === this.userMenu[0].title) {
          this.dialog.open(NguoiDungCreateComponent,
            this.commonService.configDialog("70%",
            {
              key:this.target.userId,
              actionType: STATUS_ACTION.edit
            }))
            .afterClosed()
            .subscribe(() => {});
        } else if (title.item.title === this.userMenu[2].title) {
          this.target.trangThai = 0;
          this.service.sysUserUpdateStatus(this.target.userId, this.target.trangThai).subscribe(res => {
            if (res.code === SUCCESS_RESPONSE) {
              this.commonService.toastrSuccess(SUCCESS_NOTICE);
              this.navigateHome();
            }
          });
        }
      });
    }
  }

  navigateHome() {
    window.localStorage.clear();
    window.localStorage.removeItem('User');
    window.location.href = "/login";
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }
}
