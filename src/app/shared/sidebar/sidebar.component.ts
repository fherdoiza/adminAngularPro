import { UserService } from "./../../services/user/user.service";
import { SidebarService } from "./../../services/sidebar.service";
import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user.model";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styles: []
})
export class SidebarComponent implements OnInit {
  items: any[];
  user: User;

  constructor(
    public sidebarService: SidebarService,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.items = this.sidebarService.menu;
    this.user = this.userService.user;
  }
  logout() {
    this.userService.logout();
  }
}
