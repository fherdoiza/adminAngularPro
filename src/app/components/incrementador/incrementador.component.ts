import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.scss']
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtPercentage') txtPercentage: ElementRef;

  @Input() labelValue: string = 'Title';
  @Input() percentage: number = 50;

  @Output() changeValue: EventEmitter<number>  = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  changePercentage(valor) {
    if (this.percentage >= 100 && valor > 0 ) {
      this.percentage = 100;
      return;
    }
    if (this.percentage <= 0 && valor < 0 ) {
      this.percentage = 0;
      return;
    }
    this.percentage = this.percentage + valor;

    this.changeValue.emit(this.percentage);
    this.txtPercentage.nativeElement.focus();
  }
  onChange(value: number) {

    if (value >= 100) {
      value = 100;
    }
    if (value <= 0) {
      value = 0;
    }
    this.txtPercentage.nativeElement.value = Number(value);
    this.changeValue.emit(value);

    this.txtPercentage.nativeElement.focus();
  }
}
