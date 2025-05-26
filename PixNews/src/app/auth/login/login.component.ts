import { LoginService } from './login.service';
import { NgIf } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
    imports: [ReactiveFormsModule, NgIf], // NgIf adicionado corretamente
    standalone: true,
    styleUrls: ['./login.component.css'], // Corrigido para "styleUrls"
    selector: 'app-login',
    templateUrl: './login.component.html',
    encapsulation: ViewEncapsulation.None // <- ISSO PERMITE HERDAR CSS GLOBAL

})
export class LoginComponent implements OnInit {
    loginError: string = '';
    successMessage: string = '';
    loginForm: FormGroup;

    constructor(private fb: FormBuilder, private loginService: LoginService,
    private router: Router)
    {
        this.loginForm = this.fb.group({
            cpfCnpj: ['', [Validators.required]],
            senha: ['', [Validators.required]],
        });
    }
    ngOnInit(): void {
        if (this.loginService.isAuthenticated$) {
            this.router.navigate(['/noticias']);
        }
      }

    navigateToRegister(): void {
        this.router.navigateByUrl('/registrar');
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            this.loginService.login(this.loginForm.value)
                .subscribe({
                    next: (response) => {
                        this.router.navigate(['/noticias']);                     

                    },
                    error: (error) => {
                        this.loginError = 'Erro ao realizar login. Tente novamente.';
                    }
                });
        } else {
            console.warn('Formulário inválido');
        }
    }
}
