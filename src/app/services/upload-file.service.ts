import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UploadFileService {
  constructor() {}

  uploadFile(file: File, type: string, id: string) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append("imageFile", file, file.name);

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };

      const url = environment.apiRoute + "/uploads/" + type + "/" + id;

      xhr.open("PUT", url, true);
      xhr.send(formData);
    });
  }
}
