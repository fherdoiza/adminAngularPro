import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Hospital } from "./../../models/hospital.model";
import { DoctorService } from "src/app/services/doctor/doctor.service";
import { HospitalService } from "src/app/services/hospital/hospital.service";
import { Doctor } from "src/app/models/doctor.model";
import { ModalUploadService } from "src/app/components/modal-upload/modal-upload.service";
@Component({
  selector: "app-doctor",
  templateUrl: "./doctor.component.html",
  styles: []
})
export class DoctorComponent implements OnInit {
  hospitals: Hospital[];
  doctor: Doctor = new Doctor("", "", "", null, "");
  hospital: Hospital = new Hospital("");

  constructor(
    public doctorService: DoctorService,
    public hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe(params => {
      const id = params["id"];
      if (id !== "new") {
        this.getDoctor(id);
      }
    });
  }

  ngOnInit() {
    this.hospitalService
      .getHospitals()
      .subscribe(resp => (this.hospitals = resp));

    this.modalUploadService.notification.subscribe((resp: any) => {
      this.doctor.img = resp.data.img;
    });
  }

  getDoctor(id: string) {
    this.doctorService.getDoctor(id).subscribe((resp: any) => {
      console.log(resp);
      this.doctor = resp;
      this.doctor.hospital = resp.hospital._id;
      this.changeHospital(this.doctor.hospital);
    });
  }

  saveDoctor(doctorForm: NgForm) {
    if (doctorForm.invalid) {
      return;
    }

    this.doctorService.saveDoctor(this.doctor).subscribe((resp: any) => {
      console.log(resp);
      this.doctor._id = resp._id;
      this.router.navigate(["/doctor", resp._id]);
    });
  }

  changeHospital(value) {
    this.hospitalService.getHospital(value).subscribe(resp => {
      this.hospital = resp;
    });
  }

  changePicture() {
    this.modalUploadService.showModal("doctors", this.doctor._id);
  }
}
