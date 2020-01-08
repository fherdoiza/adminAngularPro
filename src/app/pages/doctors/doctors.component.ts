import { Component, OnInit } from "@angular/core";
import { Doctor } from "src/app/models/doctor.model";
import { DoctorService } from "src/app/services/doctor/doctor.service";
import { ModalUploadService } from "src/app/components/modal-upload/modal-upload.service";

@Component({
  selector: "app-doctors",
  templateUrl: "./doctors.component.html",
  styles: []
})
export class DoctorsComponent implements OnInit {
  doctors: Doctor[] = [];
  totalResults: number = 0;
  loading: boolean = false;

  constructor(
    public doctorService: DoctorService,
    public modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.getDoctors();
  }
  getDoctors() {
    this.doctorService.getDoctors().subscribe(resp => {
      this.totalResults = this.doctorService.totalDoctors;
      this.doctors = resp;
    });
  }
  searchDoctors(query: string) {
    if (!query) {
      this.getDoctors();
      return;
    }
    this.loading = true;
    this.doctorService.searchDoctor(query).subscribe((resp: Doctor[]) => {
      this.doctors = resp;
      this.loading = false;
    });
  }

  updateImage(doctor: Doctor) {
    this.modalUploadService.showModal("doctors", doctor._id);
  }

  deleteDoctor(doctor: Doctor) {
    this.doctorService
      .deleteDoctor(doctor._id)
      .subscribe(() => this.getDoctors());
  }
}
