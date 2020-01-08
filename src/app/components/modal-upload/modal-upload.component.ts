import { ModalUploadService } from "./modal-upload.service";
import { UploadFileService } from "./../../services/upload-file.service";
import { Component, OnInit } from "@angular/core";
import swal from "sweetalert";

@Component({
  selector: "app-modal-upload",
  templateUrl: "./modal-upload.component.html",
  styles: []
})
export class ModalUploadComponent implements OnInit {
  uploadedImage: File;
  tempImage;

  constructor(
    public uploadFileService: UploadFileService,
    public modalUploadService: ModalUploadService
  ) {}

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

  closeModal() {
    this.uploadedImage = null;
    this.tempImage = null;
    this.modalUploadService.hideModal();
  }

  uploadImage() {
    this.uploadFileService
      .uploadFile(
        this.uploadedImage,
        this.modalUploadService.type,
        this.modalUploadService.id
      )
      .then((resp: any) => {
        this.modalUploadService.notification.emit(resp);
        this.closeModal();
      })
      .catch(err => {
        console.log("There was an error when the image was uploading");
      });
  }
}
