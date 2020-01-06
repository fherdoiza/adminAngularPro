import { UserService } from "./../../services/user/user.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styles: []
})
export class HeaderComponent implements OnInit {
  constructor(public userService: UserService) {}

  ngOnInit() {}
  logout() {
    this.userService.logout();
  }
}
