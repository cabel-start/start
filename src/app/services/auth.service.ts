import { Injectable } from '@angular/core';
import { AngularFireAuth   } from '@angular/fire/auth';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: User;

  get isLoggedIn(): boolean {
    return !!this.user && !!this.user.uid;
  }

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.initialAuth();
   }

  initialAuth(): Promise<void> {
    return new Promise((resolve) => {
      this.afAuth.auth.onAuthStateChanged(user => {
        if (user) {
          this.getUserProfile(user.uid);
          resolve();
        } else {
          this.user = null;
        }
      });
    });
  }

  getUserProfile(uid: string) {
    this.afs.collection(`users`).doc(uid).ref.get().then(user => {
      this.user = user.data() as User;
    }); 
  } 

  async login(user: User) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if (result.user) {
        this.user = {
          email: result.user.email,
          uid: result.user.uid
        }
      }
    } 
    catch (e) {
      console.error(e);
    }
  }

  async register(user: User) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      if (result.user) {
        this.afs.collection('/users').doc(result.user.uid).set({
          name: user.name,
          email: result.user.email,
          city: user.city
        });
        return result;
      }
    } 
    catch (e) {
      console.error(e);
    }
  }

  /*   getUserProfile(uid: string) {
    let user = this.afs.collection(`users`).valueChanges().subscribe((data) => {
      console.log(data, 'DATA CHANGED')
    });
    console.log(user, 'USER')
  } */
}
