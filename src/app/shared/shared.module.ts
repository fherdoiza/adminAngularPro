import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { BreadcrumbsComponent } from "./breadcrumbs/breadcrumbs.component";
import { NopagefoundComponent } from "../nopagefound/nopagefound.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { PipesModule } from "./../pipes/pipes.module";

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    NopagefoundComponent
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    NopagefoundComponent
  ],
  imports: [CommonModule, RouterModule, PipesModule],
  providers: [],
  bootstrap: []
})
export class SharedModule {}
