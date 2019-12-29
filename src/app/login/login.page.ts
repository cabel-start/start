import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {} as User;

  constructor(private afAuth: AuthService, private router: Router) { 
    this.afAuth.initialAuth().then(() => {
        this.router.navigate(['/tabs']);
    });
  }

  ngOnInit() { }

  async login(user: User) {
    await this.afAuth.login(user);
    if (this.afAuth.isLoggedIn) {
      this.router.navigate(['/tabs']);
    }
  }

}
