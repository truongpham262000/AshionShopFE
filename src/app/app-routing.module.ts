import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthGuard } from "./@core/auth.guard";
import { LoginComponent } from "./@theme/components/login/login.component";
import { RegisterComponent } from "./@theme/components/register/register.component";

export const routes: Routes = [
  {
    path: "AdminShop",
    loadChildren: () =>
      import("./app-admin/app-admin.module").then((m) => m.AppAdminModule),
    canActivate: [AuthGuard],
  },
  {
    path: "Ashion",
    loadChildren: () =>
      import("./app-client/app-client.module").then((m) => m.AppClientModule),
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  { path: "", redirectTo: "/Ashion", pathMatch: "full" },
  { path: "**", redirectTo: "/Ashion" },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
