import * as grpc from '@grpc/grpc-js';
import { UsuarioService } from './generated/usuario'; // import gerado pelo ts-proto
import { usuarioService } from './services/usuario.service'; // seu serviço implementado

const server = new grpc.Server();

server.addService(UsuarioService, usuarioService);

const address = 'localhost:50051';

server.bindAsync(address, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error('Erro ao iniciar o servidor:', err);
    return;
  }
  console.log(`Servidor gRPC rodando em ${address}`);
});
