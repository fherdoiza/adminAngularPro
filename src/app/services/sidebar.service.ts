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
        }
      ]
    }
  ];

  constructor() {}
}
