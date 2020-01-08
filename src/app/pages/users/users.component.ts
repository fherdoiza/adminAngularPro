import { ModalUploadService } from "./../../components/modal-upload/modal-upload.service";
import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user.model";
import { UserService } from "./../../services/user/user.service";

declare var swal: any;
@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styles: []
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  skip: number = 0;
  totalResults: number = 0;

  loading: boolean = false;
  constructor(
    public userService: UserService,
    public modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.getUsers();

    this.modalUploadService.notification.subscribe((resp: any) => {
      this.getUsers();
    });
  }

  getUsers() {
    this.loading = true;
    this.userService.getUsers(this.skip).subscribe((resp: any) => {
      this.totalResults = resp.total;
      this.users = resp.data;
      this.loading = false;
    });
  }

  changeSkip(value: number) {
    const newSkip = this.skip + value;
    if (newSkip >= this.totalResults) {
      return;
    }
    if (newSkip < 0) {
      return;
    }
    this.skip += value;
    this.getUsers();
  }

  searchUser(query: string) {
    if (!query) {
      this.getUsers();
      return;
    }
    this.loading = true;
    this.userService.searchUsers(query).subscribe((resp: User[]) => {
      this.users = resp;
      this.loading = false;
    });
  }

  deleteUser(user: User) {
    if (user._id === this.userService.user._id) {
      swal("No se puede borrar", "No se puede borrar al mismo user", "error");
      return;
    }

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        this.userService.deleteUser(user._id).subscribe((resp: any) => {
          this.getUsers();
          swal(
            "Usuario Borrado",
            "Se ha eliminado el usuario de la base de datos",
            "success"
          );
        });
      }
    });
  }

  saveUser(user: User) {
    this.userService.updateUser(user).subscribe();
  }

  showModal(userId: string) {
    this.modalUploadService.showModal("users", userId);
  }
}
