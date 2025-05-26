export interface User {
    username: string;
    cpf?: string;
    password?: string;
  }
  
  export interface RegisteredUser {
    nome: string;
    cpf: string;
    senha: string;
  }
  
  export interface Noticia {
    id: number;
    titulo: string;
    resumo: string;
    data: string;
    categoria: string;
    url: string;
    fonte: string;
    imagem?: string;
  }
  
  export interface PixData {
    valor: number;
    qrCode: string;
    timestamp: Date;
  }
  
  export interface PixResponse {
    success: boolean;
    encodedImage: string;
    payload: string;
    expirationDate: string;
  }