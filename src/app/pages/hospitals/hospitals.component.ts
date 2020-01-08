import { Component, OnInit } from "@angular/core";
import { Hospital } from "./../../models/hospital.model";
import { HospitalService } from "src/app/services/hospital/hospital.service";
import { ModalUploadService } from "src/app/components/modal-upload/modal-upload.service";
declare var swal: any;
@Component({
  selector: "app-hospitals",
  templateUrl: "./hospitals.component.html",
  styles: []
})
export class HospitalsComponent implements OnInit {
  hospitals: Hospital[] = [];
  skip: number = 0;
  totalResults: number = 0;
  loading: boolean = false;
  constructor(
    public hospitalService: HospitalService,
    public modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.getHospitals();
    this.modalUploadService.notification.subscribe((resp: any) => {
      this.getHospitals();
    });
  }

  getHospitals() {
    this.loading = true;
    this.hospitalService.getHospitals().subscribe((resp: any) => {
      this.totalResults = this.hospitalService.totalHospitals;
      this.hospitals = resp;
      this.loading = false;
    });
  }

  searchHospital(query: string) {
    if (!query) {
      this.getHospitals();
      return;
    }
    this.loading = true;
    this.hospitalService.searchHospital(query).subscribe((resp: Hospital[]) => {
      this.hospitals = resp;
      this.loading = false;
    });
  }
  updateImage(hospital: Hospital) {
    this.modalUploadService.showModal("hospitals", hospital._id);
  }

  saveHospital(hospital: Hospital) {
    this.hospitalService.updateHospital(hospital).subscribe();
  }
  deleteHospital(hospital: Hospital) {
    this.hospitalService
      .deleteHospital(hospital._id)
      .subscribe(() => this.getHospitals());
  }

  createHospital() {
    swal({
      title: "Create Hospital",
      text: "Hospital name",
      content: "input",
      button: {
        text: "Create",
        closeModal: true
      }
    }).then(resp => {
      if (!resp || resp.length === 0) {
        return;
      }
      this.hospitalService
        .createHospital(resp)
        .subscribe(() => this.getHospitals());
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
    this.getHospitals();
  }
}
