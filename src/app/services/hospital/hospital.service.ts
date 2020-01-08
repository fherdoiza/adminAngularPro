import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { UserService } from "../user/user.service";
import { Hospital } from "./../../models/hospital.model";
import { environment } from "./../../../environments/environment";
import swal from "sweetalert";
@Injectable({
  providedIn: "root"
})
export class HospitalService {
  totalHospitals: number = 0;
  constructor(public http: HttpClient, public userService: UserService) {}

  getHospitals() {
    const url = environment.apiRoute + "/hospital";
    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalHospitals = resp.total;
        return resp.data;
      })
    );
  }

  getHospital(id: string) {
    const url = environment.apiRoute + "/hospital/" + id;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.hospital;
      })
    );
  }

  deleteHospital(id: string) {
    const url =
      environment.apiRoute +
      "/hospital/" +
      id +
      "?token=" +
      this.userService.token;
    return this.http
      .delete(url)
      .pipe(
        map(resp => swal("Eliminado", "Se eliminó el hospital", "success"))
      );
  }

  createHospital(name: string) {
    const url =
      environment.apiRoute + "/hospital" + "?token=" + this.userService.token;
    return this.http
      .post(url, { nombre: name })
      .pipe(map((resp: any) => resp.data));
  }

  searchHospital(query: string) {
    const url = environment.apiRoute + "/search/collection/hospitals/" + query;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.hospitals;
      })
    );
  }

  updateHospital(hospital: Hospital) {
    const url =
      environment.apiRoute +
      "/hospital/" +
      hospital._id +
      "?token=" +
      this.userService.token;
    return this.http.put(url, hospital).pipe(
      map((resp: any) => {
        swal("Actualización correcta", "El hospital se actualizó", "success");
        return resp.data;
      })
    );
  }
}
