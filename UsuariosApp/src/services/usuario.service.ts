import { UsuarioServer, UsuarioResponse, CriarUsuarioRequest, LoginRequest } from '../generated/usuario';
import { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import { UsuarioRepository } from '../repositories/usuario.repository';

const usuarioRepo = new UsuarioRepository();

export const usuarioService: UsuarioServer = {
  adicionar: async (call: ServerUnaryCall<CriarUsuarioRequest, UsuarioResponse>, callback: sendUnaryData<UsuarioResponse>) => {
    const { nome, cpfCnpj, senha, idClientAssas } = call.request;
    try {
      const usuarioCriado = await usuarioRepo.criar({ nome, cpfCnpj, senha, idClientAssas });
      callback(null, {
        id: usuarioCriado.id!,
        nome: usuarioCriado.nome,
        cpfCnpj: usuarioCriado.cpfCpnj,
        idClientAssas: usuarioCriado.idClientAssas,
      });
    } catch (error) {
      console.error(error);
      callback(error as any, null);
    }
  },
 
  login: async (call: ServerUnaryCall<LoginRequest, UsuarioResponse>, callback: sendUnaryData<UsuarioResponse>) => {
  const { cpfCnpj, senha } = call.request;
  try {
    const usuario = await usuarioRepo.logar(cpfCnpj, senha);
    if (!usuario) {
      return callback({
        code: 5,
        message: 'CPF ou senha inválidos',
      }, null);
    }
    callback(null, {
      id: usuario.id!,
      nome: usuario.nome,
      cpfCnpj: usuario.cpfCpnj,
      idClientAssas: usuario.idClientAssas,
    });
  } catch (error) {
    console.error(error);
    callback(error as any, null);
  }
}
};
