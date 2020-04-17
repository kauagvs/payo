import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DashboardModule } from './pages/dashboard/dashboard.module';

// Environments
import { environment } from '../environments/environment';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

//App Components
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

// App Pages
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

// App Services
import { AuthService} from './services/auth/auth.service'
import { ApiService } from './services/api/api.service';

// App Guards
import { AuthGuard } from './guards/auth/auth.guard';
import { ChartBarComponent } from './components/charts/chart-bar/chart-bar.component';
import { ChartDoughnutComponent } from './components/charts/chart-doughnut/chart-doughnut.component';
import { DefaultTableComponent } from './components/tables/default-table/default-table.component';
import { CardDefaultComponent } from './components/cards/card-default/card-default.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    ChartBarComponent,
    ChartDoughnutComponent,
    DefaultTableComponent,
    CardDefaultComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    DashboardModule,
    FormsModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [AuthService, ApiService ,AuthGuard, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
