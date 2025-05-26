"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
const index_1 = require("../database/index");
class UsuarioRepository {
    async criar(usuario) {
        try {
            console.log(`[UsuarioRepository] Verificando existência de usuário com nome: ${usuario.nome} ou cpf: ${usuario.cpfCnpj}`);
            const existe = await this.existePorNomeOuCpfCpnj(usuario.nome, usuario.cpfCnpj);
            if (existe) {
                console.warn('[UsuarioRepository] Já existe usuário com esse nome ou cpfCnpj');
                throw new Error('Já existe usuário com esse CpfCpnj ou nome');
            }
            const conn = await (0, index_1.connect)();
            console.log('[UsuarioRepository] Inserindo usuário no banco...');
            const [result] = await conn.execute('INSERT INTO Usuarios (nome, cpfCpnj, senha, idClientAssas) VALUES (?, ?, ?, ?)', [usuario.nome, usuario.cpfCnpj, usuario.senha, usuario.idClientAssas]);
            const insertId = result.insertId;
            console.log(`[UsuarioRepository] Usuário criado com ID: ${insertId}`);
            return {
                id: insertId,
                nome: usuario.nome,
                cpfCpnj: usuario.cpfCnpj,
                idClientAssas: usuario.idClientAssas,
            };
        }
        catch (error) {
            console.error('[UsuarioRepository] Erro no método criar:', error);
            throw error;
        }
    }
    async logar(cpfCpnj, senha) {
        try {
            console.log(`[UsuarioRepository] Tentando logar usuário com cpfCpnj: ${cpfCpnj}`);
            const conn = await (0, index_1.connect)();
            const [rows] = await conn.execute('SELECT id, nome, cpfCpnj FROM Usuarios WHERE cpfCpnj = ? AND senha = ?', [cpfCpnj, senha]);
            const results = rows;
            if (results.length > 0) {
                const user = results[0];
                console.log(`[UsuarioRepository] Usuário logado: ${user.nome} (ID: ${user.id})`);
                return {
                    id: user.id,
                    nome: user.nome,
                    cpfCpnj: user.cpfCpnj,
                    idClientAssas: user.idClientAssas,
                };
            }
            console.warn('[UsuarioRepository] Usuário não encontrado ou senha inválida');
            return null;
        }
        catch (error) {
            console.error('[UsuarioRepository] Erro no método logar:', error);
            throw error;
        }
    }
    async existePorNomeOuCpfCpnj(nome, cpfCpnj) {
        try {
            console.log(`[UsuarioRepository] Verificando existência por cpf ou nome: cpfCpnj=${cpfCpnj}, nome=${nome}`);
            const conn = await (0, index_1.connect)();
            const [rows] = await conn.execute('SELECT COUNT(*) as count FROM Usuarios WHERE cpfCpnj = ? OR nome = ?', [cpfCpnj, nome]);
            const count = rows[0].count;
            console.log(`[UsuarioRepository] Resultado da verificação: ${count} encontrado(s)`);
            return count > 0;
        }
        catch (error) {
            console.error('[UsuarioRepository] Erro no método existePorNomeOuCpfCpnj:', error);
            throw error;
        }
    }
}
exports.UsuarioRepository = UsuarioRepository;
