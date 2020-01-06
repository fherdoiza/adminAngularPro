import { Injectable } from "@angular/core";
import { User } from "./../../models/user.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import swal from "sweetalert";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class UserService {
  user: User;
  token: string;
  constructor(public http: HttpClient, public router: Router) {
    this.getStorage();
  }

  saveStorage(id: string, token: string, user: User) {
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    this.user = user;
    this.token = token;
  }

  isLogged() {
    return this.token.length > 5 ? true : false;
  }

  getStorage() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.user = JSON.parse(localStorage.getItem("user"));
    } else {
      this.token = "";
      this.user = null;
    }
  }

  createUser(user: User) {
    const url = environment.apiRoute + "/user";

    return this.http.post(url, user).pipe(
      map((resp: any) => {
        swal("Usuario creado", user.email, "success");
        return resp.user;
      })
    );
  }

  login(user: User, rememberMe: Boolean = false) {
    const url = environment.apiRoute + "/login";
    return this.http.post(url, user).pipe(
      map((resp: any) => {
        this.saveStorage(resp.data.user._id, resp.data.token, resp.data.user);

        if (rememberMe) {
          localStorage.setItem("email", user.email);
        } else {
          localStorage.removeItem("email");
        }
        return resp;
      })
    );
  }

  loginGoogle(token: string) {
    const url = environment.apiRoute + "/login/google";
    return this.http.post(url, { token }).pipe(
      map((resp: any) => {
        this.saveStorage(resp.data.user._id, resp.data.token, resp.data.user);
        return resp;
      })
    );
  }

  logout() {
    this.user = null;
    this.token = "";
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.router.navigate(["/login"]);
  }
}
