import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../@core/auth.service';
import { CommonService } from '../../../@core/customs/common.service';
import { SUCCESS_RESPONSE } from '../../../@core/customs/constants';
import { AshionShop, LoginUser } from '../../../@core/data/ashion-shop.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private api: AshionShop,
    private commonService: CommonService,
    private router: Router,
    private auth: AuthService,
  ) {}
  login: LoginUser = new LoginUser();
  ngOnInit(): void {
  }

  save() {
    this.api.sysUserLogin(this.login).subscribe(res => {
      if(res.code === SUCCESS_RESPONSE) {
        if(res.data.trangThai === 1){
          this.auth.storeToken(res.data.tokenData);
          window.localStorage.setItem('User',JSON.stringify(res.data).toString());
          this.router.navigate(['/AdminShop']);
        } else {
          this.commonService.toastrWarning("Tài khoản chưa được cấp quyền sử dụng.")
        }
      } else {
        this.commonService.toastrDanger("Tài khoản hoặc mật khẩu không chính xác.");
      }
    })
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
