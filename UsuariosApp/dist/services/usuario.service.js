"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioService = void 0;
const usuario_repository_1 = require("../repositories/usuario.repository");
const usuarioRepo = new usuario_repository_1.UsuarioRepository();
exports.usuarioService = {
    adicionar: async (call, callback) => {
        const { nome, cpfCnpj, senha, idClientAssas } = call.request;
        try {
            const usuarioCriado = await usuarioRepo.criar({ nome, cpfCnpj, senha, idClientAssas });
            callback(null, {
                id: usuarioCriado.id,
                nome: usuarioCriado.nome,
                cpfCnpj: usuarioCriado.cpfCpnj,
                idClientAssas: usuarioCriado.idClientAssas,
            });
        }
        catch (error) {
            console.error(error);
            callback(error, null);
        }
    },
    login: async (call, callback) => {
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
                id: usuario.id,
                nome: usuario.nome,
                cpfCnpj: usuario.cpfCpnj,
                idClientAssas: usuario.idClientAssas,
            });
        }
        catch (error) {
            console.error(error);
            callback(error, null);
        }
    }
};
