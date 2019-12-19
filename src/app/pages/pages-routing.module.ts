import { PromisesComponent } from "./promises/promises.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { RxjsComponent } from "./rxjs/rxjs.component";

const pagesRoutes: Routes = [
  {
    path: "",
    component: PagesComponent,
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
      { path: "", redirectTo: "/dashboard", pathMatch: "full" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(pagesRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
