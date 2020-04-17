import { Component } from '@angular/core';
import { AppService } from './services/app/app.service';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Payo';

  isLogged: boolean = false;

  constructor(private appService: AppService, private authService: AuthService) {}

  ngOnInit() {
    this.authService.isLogged.subscribe(
      show => this.isLogged = show
    )
  }

  getClasses() {
    const classes = {
      'pinned-sidebar': this.appService.getSidebarStat().isSidebarPinned,
      'toggeled-sidebar': this.appService.getSidebarStat().isSidebarToggeled,
    }
    return classes;
  }
  toggleSidebar() {
    this.appService.toggleSidebar();
  }
}
