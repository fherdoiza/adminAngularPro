import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { UserService } from "./../services/user/user.service";
import { User } from "../models/user.model";
import { ThrowStmt } from "@angular/compiler";

declare function init_plugins();
declare const gapi: any;
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  rememberMe: boolean = false;
  email: string = "";
  auth2: any;

  constructor(public router: Router, public userService: UserService) {}

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem("email") || "";
    if (this.email.length > 1) {
      this.rememberMe = true;
    }
  }

  googleInit() {
    gapi.load("auth2", () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          "532780576026-e115ccdkhmm944241buvt3a5a0iv3un2.apps.googleusercontent.com",
        cookiepolicy: "single_host_origin",
        scope: "profile email"
      });

      this.attachSignin(document.getElementById("btnGoogle"));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, googleUser => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;

      this.userService.loginGoogle(token).subscribe(resp => {
        console.log(resp);
        this.router.navigate(["/dashboard"]);
      });
    });
  }

  login(loginForm: NgForm) {
    console.log(loginForm.value);
    if (loginForm.valid) {
      const user = new User(
        null,
        loginForm.value.email,
        loginForm.value.password
      );
      this.userService.login(user, loginForm.value.remember).subscribe(resp => {
        console.log(resp);
        // this.router.navigate(["/dashboard"]);
        window.location.href = "#/dashboard";
      });
    }
  }
}
