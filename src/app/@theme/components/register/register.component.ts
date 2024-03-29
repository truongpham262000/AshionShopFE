import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../@core/auth.service';
import { CommonService } from '../../../@core/customs/common.service';
import { SUCCESS_RESPONSE } from '../../../@core/customs/constants';
import { AshionShop, List_Province, SysUserModel } from '../../../@core/data/ashion-shop.service';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  constructor(
    private api: AshionShop,
    private commonService: CommonService,
    private router: Router,
    private auth: AuthService,
  ) { }
  lstData: List_Province[] = [];
  target: SysUserModel = new SysUserModel();

  ngOnInit(): void {
    this.loadCountry();
  }

  loadCountry() {
    this.api.getListProvince().subscribe(res => {
      if (res.code === SUCCESS_RESPONSE) {
        this.lstData = res.data.results;
      }
    })
  }

  repeatPass: string;
  maTinhData: any;
  save() {
    this.target.trangThai = 1;
    this.target.maTinh = this.maTinhData?.code.toString();
    this.api.sysUserInsert(this.target).subscribe(res => {
      if (res.code === SUCCESS_RESPONSE) {
        this.commonService.toastrSuccess("Đăng ký tài khoản thành công.");
        this.router.navigateByUrl('/login');
      } else {
        this.commonService.toastrWarning("Tài khoản đã có người đăng ký.");
      }
    });
  }

  showPass = true;
  setTypeInput = "password";
  setEyePassword() {
    this.showPass = !this.showPass;
    if(this.showPass === false) {
      this.setTypeInput = "text";
    } else {
      this.setTypeInput = "password";
    }
  }
}
