import { Pipe, PipeTransform } from "@angular/core";
import { environment } from "./../../environments/environment";

@Pipe({
  name: "image"
})
export class ImagePipe implements PipeTransform {
  transform(img: string, type: string = "user"): any {
    const url = environment.apiRoute + "/img";

    if (!img) {
      return url + "/users/noexiste";
    }

    if (img.indexOf("http") >= 0) {
      return img;
    }

    let newUrl = "";

    switch (type) {
      case "user":
        newUrl = url + "/users/" + img;
        break;
      case "doctor":
        newUrl = url + "/doctors/" + img;
        break;
      case "hospital":
        newUrl = url + "/hospitals/" + img;
        break;
      default:
        break;
    }
    return newUrl;
  }
}
