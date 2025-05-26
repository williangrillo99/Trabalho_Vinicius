import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import {  NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registerError: string = '';
  isLoading: boolean = false;
  autenticado: boolean = false;
  constructor(
  
    private formBuilder: FormBuilder,
    private authService: LoginService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      cpfCnpj: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(x => {
      console.log(x);
      if (x) {
        this.router.navigate(['/noticias']);
        this.autenticado = true;
      } else {
        this.autenticado = false;
      }
    });
  }



  // Validador para confirmar senha
  passwordMatchValidator(form: AbstractControl): {[key: string]: any} | null {
    const senha = form.get('senha');
    const confirmarSenha = form.get('confirmarSenha');
    
    if (senha && confirmarSenha && senha.value !== confirmarSenha.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  // Máscara para CPF
  onCpfInput(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    event.target.value = value;
    this.registerForm.patchValue({ cpfCnpj: value });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const { nome, cpfCnpj, senha } = this.registerForm.value;
      
      this.authService.registrar({cpfCnpj, nome, senha}).subscribe(
        () =>  {
          setTimeout(() => {
            this.router.navigate(['/login'], { 
            });
      
            this.isLoading = false;
          }, 1500);
        },
        (error) => {
          this.registerError = error.error.message || 'Erro ao registrar. Tente novamente.';
          setTimeout(() => {
            this.registerError = '';
          }, 3000);
          this.isLoading = false;
        }

      );

    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  // Getters para facilitar acesso aos controles
  get nome() { return this.registerForm.get('nome'); }
  get cpfCnpj() { return this.registerForm.get('cpfCnpj'); }
  get senha() { return this.registerForm.get('senha'); }
  get confirmarSenha() { return this.registerForm.get('confirmarSenha'); }
}