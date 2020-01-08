import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { UserService } from "../user/user.service";
import { Doctor } from "src/app/models/doctor.model";
import swal from "sweetalert";

@Injectable({
  providedIn: "root"
})
export class DoctorService {
  totalDoctors: number = 0;
  constructor(public http: HttpClient, public userService: UserService) {}

  getDoctors() {
    const url = environment.apiRoute + "/doctor";
    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalDoctors = resp.total;
        return resp.data;
      })
    );
  }

  getDoctor(id: string) {
    const url = environment.apiRoute + "/doctor/" + id;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.doctor;
      })
    );
  }

  searchDoctor(query: string) {
    const url = environment.apiRoute + "/search/collection/doctors/" + query;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.doctors;
      })
    );
  }

  deleteDoctor(id: string) {
    const url =
      environment.apiRoute +
      "/doctor/" +
      id +
      "?token=" +
      this.userService.token;
    return this.http
      .delete(url)
      .pipe(map(resp => swal("Eliminado", "Se eliminó el doctor", "success")));
  }

  saveDoctor(doctor: Doctor) {
    let url = environment.apiRoute + "/doctor";

    if (doctor._id) {
      url += "/" + doctor._id + "?token=" + this.userService.token;
      return this.http.put(url, doctor).pipe(
        map((resp: any) => {
          swal(
            "Medico actualizado",
            "Doctor se actualizó correctamente",
            "success"
          );
          return resp.data;
        })
      );
    } else {
      url += "?token=" + this.userService.token;

      return this.http.post(url, doctor).pipe(
        map((resp: any) => {
          swal("Medico creado", "Doctor creado correctamente", "success");
          return resp.data;
        })
      );
    }
  }
}
