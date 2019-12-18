import { Component, OnInit, Inject, ElementRef } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";
import { SettingsService } from "src/app/services/settings.service";

@Component({
  selector: "app-account-settings",
  templateUrl: "./account-settings.component.html",
  styles: []
})
export class AccountSettingsComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private _document,
    public settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.placeCheck();
  }

  changeTheme(theme: string, link: any) {
    this.settingsService.setTheme(theme);

    this.setCheck(link);
  }

  setCheck(link: any) {
    const selectors = this._document.getElementsByClassName("selector");
    for (const ref of selectors) {
      ref.classList.remove("working");
    }

    link.classList.add("working");
  }

  placeCheck() {
    const selectors = this._document.getElementsByClassName("selector");
    const theme = this.settingsService.settings.theme;
    for (const ref of selectors) {
      if (ref.getAttribute("data-theme") === theme) {
        ref.classList.add("working");
        break;
      }
    }
  }
}
