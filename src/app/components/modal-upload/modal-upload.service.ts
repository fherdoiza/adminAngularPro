import { Injectable, EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ModalUploadService {
  public type: string;
  public id: string;
  public hidden: string = "not-show";

  public notification = new EventEmitter<any>();
  constructor() {
    console.log("Modal Upload Service");
  }

  hideModal() {
    this.type = null;
    this.id = null;
    this.hidden = "not-show";
  }
  showModal(type: string, id: string) {
    this.hidden = "";
    this.id = id;
    this.type = type;
  }
}
