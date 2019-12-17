import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private _document
  ) { }

  ngOnInit() {
  }

  changeTheme(theme: string, link: any) {
    const url = `assets/css/colors/${theme}.css`;
    this._document.getElementById('themeCss').setAttribute('href', url);

    this.setCheck(link);
  }

  setCheck(link: any) {
    const selectors = this._document.getElementsByClassName('selector');
    for (const ref of selectors) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }
}
