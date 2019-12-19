import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscriber, Subscription } from "rxjs";
import { retry, map, filter } from "rxjs/operators";

@Component({
  selector: "app-rxjs",
  templateUrl: "./rxjs.component.html",
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  constructor() {
    this.subscription = this.returnAnObservable()
      .pipe(retry(2))
      .subscribe(
        num => {
          console.log(num);
        },
        error => console.log(error),
        () => console.log("Observer Ends")
      );
  }

  ngOnInit() {}

  returnAnObservable(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      let contador = 0;
      const interval = setInterval(() => {
        contador += 1;

        const response = {
          value: contador
        };
        observer.next(response);

        /*if (contador === 2) {
          observer.error("Error in number 2");
        }*/
        if (contador > 4) {
          clearInterval(interval);
          // observer.complete(); finaliza el observer si no se implementa se debe usar unsubscribe
        }
      }, 1000);
    }).pipe(
      map(resp => {
        return resp.value;
      }),
      filter((number, index) => {
        if (number % 2 === 1) {
          // solo imprime numero impares
          return true;
        } else {
          return false;
        }
      })
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
