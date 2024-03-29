import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
// import { ApiResponse, KhoaCNTT, LoginUser, UserModel, UserModelApiResponse } from './data/kcntt.service';
import {
  ApiResponse,
  AshionShop,
  LoginUser,
  SysUserModel,
  SysUserModelApiResponse,
} from "./data/ashion-shop.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private api: AshionShop, private router: Router) {}

  signUp(body: SysUserModel): Observable<ApiResponse> {
    return this.api.sysUserInsert(body);
  }

  signIn(login: LoginUser): Observable<SysUserModelApiResponse> {
    return this.api.sysUserLogin(login);
  }

  storeToken(token: string) {
    localStorage.setItem("token", token);
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(["/"]);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }
}
