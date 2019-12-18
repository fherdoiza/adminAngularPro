import { SidebarService } from "./../../services/sidebar.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styles: []
})
export class SidebarComponent implements OnInit {
  items: any[];

  constructor(public sidebarService: SidebarService) {}

  ngOnInit() {
    this.items = this.sidebarService.menu;
  }
}
