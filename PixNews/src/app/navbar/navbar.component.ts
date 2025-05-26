import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../auth/login/login.service';

@Component({
  selector: 'app-navbar',
    standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

 
  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }
}