import { Injectable, EventEmitter, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../../shared/user.class";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { auth } from "firebase/app";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private userAuth: boolean = false;

  isLogged = new EventEmitter<boolean>();

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.userAuth = true;
        this.isLogged.emit(true);
        this.router.navigate(["/dashboard"]);
      } else {
        this.userAuth = false;
        this.isLogged.emit(false);
        this.router.navigate(["/login"]);
      }
    })
  }



  userIsAuth() {
    return this.userAuth;
  }

  // Sign in with email/password
  signIn(user: User) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(user.email, user.password)
      .then(result => {
        this.ngZone.run(() => {
          this.userAuth = true;
          this.isLogged.emit(true);
          this.router.navigate(["/dashboard"]);
        });
      })
      .catch(error => {
        this.userAuth = false;
        this.router.navigate(["/login"]);
      });
  }

  // Sign up with email/password
  signUp(user: User) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        this.ngZone.run(() => {
          this.userAuth = true;
          this.isLogged.emit(true);
          this.router.navigate(["/dashboard"]);
        });
      }).catch((error) => {
        this.userAuth = false;
        this.router.navigate(["/login"]);
      })
  }

  // Sign out
  signOut() {
    return this.afAuth.auth.signOut().then(() => {
      this.userAuth = false;
      this.isLogged.emit(false);
      this.router.navigate(["/login"]);
    });
  }

  // Reset Forggot password
  forgotPassword(user: User) {
    return this.afAuth.auth.sendPasswordResetEmail(user.email)
    .then(() => {
      window.location.reload();
    }).catch((error) => {
      window.location.reload();
    })
  }

}
