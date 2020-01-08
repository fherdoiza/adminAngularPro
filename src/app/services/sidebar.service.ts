import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class SidebarService {
  menu: any = [
    {
      title: "Principal",
      icon: "mdi mdi-gauge",
      submenus: [
        {
          title: "Dashboard",
          url: "/dashboard"
        },
        {
          title: "Progress Bar",
          url: "/progress"
        },
        {
          title: "Gráficas",
          url: "/grafica1"
        },
        {
          title: "Promises",
          url: "/promises"
        },
        {
          title: "RXJS",
          url: "/rxjs"
        }
      ]
    },
    {
      title: "Administration",
      icon: "mdi mdi-folder-lock-open",
      submenus: [
        {
          title: "Users",
          url: "/users"
        },
        {
          title: "Hospitals",
          url: "/hospitals"
        },
        {
          title: "Doctors",
          url: "/doctors"
        }
      ]
    }
  ];

  constructor() {}
}
