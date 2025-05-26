import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environment';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private readonly STORAGE_KEY = 'auth';

    private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.checkAuth());
    public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();


    private apiUrl = environment.api + "usuarios/";

    constructor(private http: HttpClient) {}

    login(credentials: { cpfCnpj: string; senha: string }): Observable<any> {
        return this.http.post<any>(this.apiUrl + "logar", credentials).pipe(
            tap(response => {
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(response));
                this.isAuthenticatedSubject.next(true);
            })
        );
    }

    logout(): void {
        localStorage.removeItem(this.STORAGE_KEY);
        this.isAuthenticatedSubject.next(false);
    }

    registrar(credentials: { cpfCnpj: string; senha: string, nome: string}): Observable<boolean> {
        return this.http.post<any>(this.apiUrl + "cadastrar", credentials).pipe(
            tap(response => {
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(response));
                this.isAuthenticatedSubject.next(true);
            })
        );
    }


    private checkAuth(): boolean {
        return localStorage.getItem(this.STORAGE_KEY) !== null;
      }
    
      
}