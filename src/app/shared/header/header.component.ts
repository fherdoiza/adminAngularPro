import { Router } from "@angular/router";
import { UserService } from "./../../services/user/user.service";
import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user.model";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styles: []
})
export class HeaderComponent implements OnInit {
  constructor(public userService: UserService, public router: Router) {}

  user: User;
  ngOnInit() {
    this.user = this.userService.user;
  }
  logout() {
    this.userService.logout();
  }

  search(query: string) {
    this.router.navigate(["/search", query]);
  }
}
