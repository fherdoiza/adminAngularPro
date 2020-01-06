import { User } from './../models/user.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { UserService } from './../services/user/user.service';
import { Router } from '@angular/router';
declare function init_plugins();
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    public userService: UserService,
    public router: Router
  ) { }

  compareStrings(string1: string, string2: string) {
    return (group: FormGroup) => {

      const s1 = group.controls[string1].value;
      const s2 = group.controls[string2].value;

      if (s1 === s2) {
        return null;
      }
      return {
        areTheSame: true
      };
    };
  }

  ngOnInit() {
    init_plugins();

    this.registerForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      password2: new FormControl('', Validators.required),
      terms: new FormControl(false)
    },
    {
      validators: this.compareStrings('password', 'password2')
    });
    this.registerForm.setValue({
      nombre: 'Fer',
      email: 'fer@dasd.com',
      password: '123456',
      password2: '123456',
      terms: false
    });
  }
  registrarUsuario() {
    if (!this.registerForm.valid) {
      return;
    }

    if (!this.registerForm.value.terms) {
      swal("Importante", "Debe aceptar los términos y condiciones", "warning");
      return;
    }
    const newUser = new User(
      this.registerForm.value.nombre,
      this.registerForm.value.email,
      this.registerForm.value.password,
    );
    this.userService.createUser(newUser).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['/login']);
    });

  }
}
