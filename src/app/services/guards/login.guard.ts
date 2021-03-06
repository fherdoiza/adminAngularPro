import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { UserService } from "./../user/user.service";

@Injectable({
  providedIn: "root"
})
export class LoginGuard implements CanActivate {
  constructor(public router: Router, public userService: UserService) {}
  canActivate(): boolean {
    if (this.userService.isLogged()) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
