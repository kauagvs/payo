import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Views
import { LoginComponent } from  './pages/login/login.component';
import { DashboardComponent } from  './pages/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth/auth.guard';

const  routes:  Routes  = ([
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
])

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
