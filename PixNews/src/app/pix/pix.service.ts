import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { PixResponse } from '../models/interfaces';

@Injectable({
    providedIn: 'root',
})
export class PixService {
    private apiUrl = environment.api + "pagamento/";

    constructor(private http: HttpClient) {}


    gerarQrCode(pix: { idClientAssas: string; valor: number; }): Observable<PixResponse> {
      
        return this.http.post<any>(this.apiUrl + "GerarQRcode", pix);
    }

}