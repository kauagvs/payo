import { Component, OnInit } from '@angular/core';
import { AuthService } from  '../../services/auth/auth.service';
import { User } from '../../shared/user.class'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: User = new User();

  constructor(private authService: AuthService) {}

  isLogged: boolean = false;
  showLogin: boolean = true;
  showRegister: boolean = false;
  showForgotPassword: boolean = false;
  step1: boolean = true;
  step2: boolean = false;

  ngOnInit(): void {

  }

  goToForgotPassword() {
    this.showLogin = !this.showLogin;
    this.showForgotPassword = !this.showForgotPassword;
  }

  OpenCloseRegister() {
    this.showLogin = !this.showLogin;
    this.showRegister = !this.showRegister;
  }

  signUp() {
    this.authService.signUp(this.user);
  }

  sigIn() {
    this.authService.signIn(this.user);
  }

  forgotPassword() {
    this.authService.forgotPassword(this.user)
  }

}
