import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PixService } from './pix.service';
import { CommonModule, NgIf } from '@angular/common';
import { PixResponse } from '../models/interfaces';

@Component({
  selector: 'app-pix',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, CommonModule],
  templateUrl: './pix.component.html',
  styleUrls: ['./pix.component.css']
})
export class PixComponent implements OnInit {
  pixForm: FormGroup;
  qrCodeData: string = '';
  qrCodeImageSrc: string = '';
  showQRCode: boolean = false;
  isGenerating: boolean = false;
  pixGenerated: boolean = false;
  pixResponse: PixResponse | null = null;
  pixPayload: string = '';
  expirationDate: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private pixService: PixService
  ) {
    this.pixForm = this.formBuilder.group({
      valor: [null, [Validators.required, Validators.min(5), this.integerValidator]]
    });
  }

  ngOnInit(): void {
  
  }


  integerValidator(control: any) {
    const value = control.value;
    if (value !== null && (isNaN(value) || value % 1 !== 0)) {
      return { 'notInteger': true };
    }
    return null;
  }

  // Permite apenas números inteiros no input
  onKeyPress(event: KeyboardEvent): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    // Permite apenas números (0-9), backspace, delete, tab, escape, enter
    if (charCode === 8 || charCode === 9 || charCode === 27 || charCode === 13 ||
        (charCode >= 48 && charCode <= 57)) {
      return true;
    }
    event.preventDefault();
    return false;
  }

  generatePix(): void {
    if (this.pixForm.valid) {
      const valor = this.pixForm.get('valor')?.value;
      
      if (valor && valor > 0) {
        this.isGenerating = true;
        const authData = localStorage.getItem("auth")?.valueOf();
        const usuario = authData ? JSON.parse(authData) : null;
        const body = {
          "idClientAssas ": usuario.idClientAssas,
          "valor": valor
        };
        var idClientAssas = usuario.idClientAssas;
        setTimeout(() => this.pixService.gerarQrCode({ idClientAssas , valor} ).subscribe(data => {
          this.processPixResponse(data);

        }, error => {
          console.error('Erro ao gerar QR Code:', error);
          this.isGenerating = false;
        }), 1500);
      }
    } else {
      this.markFormGroupTouched();
    }
  }


  copyPixPayload(): void {
    if (this.pixPayload) {
      try {
        navigator.clipboard.writeText(this.pixPayload).then(() => {
          console.log('Código PIX copiado para a área de transferência');
          // Aqui você pode adicionar uma notificação de sucesso
        }).catch(() => {
          console.warn('Erro ao copiar código PIX');
        });
      } catch (error) {
        console.warn('Clipboard não disponível:', error);
      }
    }
  }
  private markFormGroupTouched(): void {
    Object.keys(this.pixForm.controls).forEach(key => {
      const control = this.pixForm.get(key);
      control?.markAsTouched();
    });
  }

  clearValue(): void {
    this.pixForm.reset();
    // this.pixService.setPixValue(0);
    this.showQRCode = false;
    this.pixGenerated = false;
    this.qrCodeData = '';
  }

  copyPixCode(): void {
    if (this.qrCodeData) {
      navigator.clipboard.writeText(this.qrCodeData).then(() => {
        // Aqui você pode adicionar uma notificação de sucesso
        console.log('Código PIX copiado para a área de transferência');
      });
    }
  }

  get valor() { 
    return this.pixForm.get('valor'); 
  }

  get isFormValid(): boolean {
    return this.pixForm.valid && this.valor?.value > 0;
  }
  private processPixResponse(response: PixResponse): void {
    if (response.success) {
      this.pixResponse = response;
      this.qrCodeImageSrc = `data:image/png;base64,${response.encodedImage}`;
      this.pixPayload = response.payload;
      this.expirationDate = response.expirationDate;
      this.showQRCode = true;
      this.pixGenerated = true;
    } 
    this.isGenerating = false;
  }

}