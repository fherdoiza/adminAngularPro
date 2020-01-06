import { UserService } from "./../../services/user/user.service";
import { SidebarService } from "./../../services/sidebar.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styles: []
})
export class SidebarComponent implements OnInit {
  items: any[];

  constructor(
    public sidebarService: SidebarService,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.items = this.sidebarService.menu;
  }
  logout() {
    this.userService.logout();
  }
}
