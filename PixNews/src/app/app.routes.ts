import { CanActivateFn } from '@angular/router';
import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
    
    {path: '', pathMatch : 'full', redirectTo: 'login'},
   
    {
        path: 'login',
        loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
    },

    {
        path: 'registrar',
        loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
    },
    {
        canActivate: [AuthGuard],
        path: 'noticias',
        loadComponent: () => import('./noticias/noticias.component').then(m => m.NoticiasComponent)
    },
    {
        canActivate: [AuthGuard],
        path: 'pix',
        loadComponent: () => import('./pix/pix.component').then(m => m.PixComponent)
    },
    {
        path: '**',
        redirectTo: 'login'
      },
];
