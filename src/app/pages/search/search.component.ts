import { environment } from "./../../../environments/environment";

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { User } from "src/app/models/user.model";
import { Doctor } from "src/app/models/doctor.model";
import { Hospital } from "src/app/models/hospital.model";
@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styles: []
})
export class SearchComponent implements OnInit {
  users: User[] = [];
  doctors: Doctor[] = [];
  hospitals: Hospital[] = [];
  constructor(public activatedRoute: ActivatedRoute, public http: HttpClient) {
    activatedRoute.params.subscribe(params => {
      const query = params["query"];
      this.search(query);
    });
  }

  ngOnInit() {}

  search(query: string) {
    const url = environment.apiRoute + "/search/todo/" + query;
    this.http.get(url).subscribe((resp: any) => {
      this.users = resp.users;
      this.doctors = resp.doctors;
      this.hospitals = resp.hospitals;
    });
  }
}
