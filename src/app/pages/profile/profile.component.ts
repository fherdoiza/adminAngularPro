import { swal } from "sweetalert";
import { UserService } from "./../../services/user/user.service";
import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user.model";
import { promise } from "protractor";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styles: []
})
export class ProfileComponent implements OnInit {
  user: User;

  uploadedImage: File;

  tempImage;

  constructor(public userService: UserService) {
    this.user = this.userService.user;
  }

  ngOnInit() {}

  selectImage(file: File) {
    if (!file) {
      return;
    }

    if (file.type.indexOf("image") < 0) {
      this.tempImage = null;
      swal("Error", "No es una Imagen", "error");
      return;
    }
    this.uploadedImage = file;

    const reader = new FileReader();
    const urlTempImage = reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.tempImage = reader.result;
    };
  }

  changeImage() {
    this.userService.changeImage(this.uploadedImage, this.user._id);
  }

  save(profileForm: User) {
    this.user.nombre = profileForm.nombre;

    console.log(this.user);

    if (!this.user.google) {
      this.user.email = profileForm.email;
    }

    this.userService.updateUser(this.user).subscribe(resp => {
      console.log("Was updated", resp);
    });
  }
}
