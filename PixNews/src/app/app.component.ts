import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { LoginService } from './auth/login/login.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  template: `
  <div class="app-container">
  <app-navbar *ngIf="isAuthenticated"></app-navbar>
  
  <main class="main-content">
    <router-outlet></router-outlet>
  </main>
</div>
  `,
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  isAuthenticated = false;

  constructor(
    private authService: LoginService,
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });
  }
}
