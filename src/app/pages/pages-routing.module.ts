import { UsersComponent } from "./users/users.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { LoginGuard } from "./../services/guards/login.guard";
import { ProfileComponent } from "./profile/profile.component";
import { PromisesComponent } from "./promises/promises.component";

const pagesRoutes: Routes = [
  {
    path: "",
    component: PagesComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: "progress",
        component: ProgressComponent,
        data: { title: "Progreso" }
      },
      {
        path: "grafica1",
        component: Graficas1Component,
        data: { title: "Gráfica" }
      },
      {
        path: "dashboard",
        component: DashboardComponent,
        data: { title: "Dashboard" }
      },
      {
        path: "promises",
        component: PromisesComponent,
        data: { title: "Promesas" }
      },
      {
        path: "rxjs",
        component: RxjsComponent,
        data: { title: "Operadores RXJS" }
      },
      {
        path: "acccount-settings",
        component: AccountSettingsComponent,
        data: { title: "Preferencias del usuario" }
      },
      {
        path: "profile",
        component: ProfileComponent,
        data: { title: "Perfil de Usuario" }
      },
      // Admin section
      {
        path: "users",
        component: UsersComponent,
        data: { title: "Users Admin" }
      },
      { path: "", redirectTo: "/dashboard", pathMatch: "full" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(pagesRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
