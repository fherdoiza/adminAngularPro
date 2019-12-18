import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";

@Injectable({
  providedIn: "root"
})
export class SettingsService {
  settings: Settings = {
    themeUrl: "assets/css/colors/default-dark.css",
    theme: "default-dark"
  };

  constructor(@Inject(DOCUMENT) private _document) {
    this.getTheme();
  }

  saveTheme() {
    localStorage.setItem("settings", JSON.stringify(this.settings));
  }

  getTheme() {
    if (localStorage.getItem("settings")) {
      this.settings = JSON.parse(localStorage.getItem("settings"));
      this.setTheme(this.settings.theme);
    } else {
      this.setTheme(this.settings.theme);
    }
  }

  setTheme(theme) {
    const url = `assets/css/colors/${theme}.css`;
    this._document.getElementById("themeCss").setAttribute("href", url);

    this.settings.theme = theme;
    this.settings.themeUrl = url;

    this.saveTheme();
  }
}

interface Settings {
  themeUrl: string;
  theme: string;
}
