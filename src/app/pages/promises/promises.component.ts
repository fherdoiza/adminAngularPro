import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-promises",
  templateUrl: "./promises.component.html",
  styles: []
})
export class PromisesComponent implements OnInit {
  constructor() {
    this.countToThree()
      .then(() => {
        console.log("Promise Ends");
      })
      .catch(error => console.error("Error in the promise"));
  }

  ngOnInit() {}

  countToThree() {
    return new Promise((resolve, reject) => {
      let contador = 0;
      const interval = setInterval(() => {
        contador += 1;
        console.log(contador);
        if (contador === 5) {
          resolve();
          clearInterval(interval);
          // reject('error en la promesa')
        }
      }, 1000);
    });
  }
}
