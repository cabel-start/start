import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  register(form: NgForm) {
  this.auth.register(form.value).then(user => {
    console.log(user)
    if (user) {
      this.router.navigate(['/login']);
    }
    });
  }

}
