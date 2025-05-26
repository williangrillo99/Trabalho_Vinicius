import { connect } from '../database/index';
import { Usuario } from '../models/usuario';

export class UsuarioRepository {
  async criar(usuario: { nome: string; cpfCnpj: string; senha: string, idClientAssas: string  }): Promise<Usuario> {
    try {
      console.log(`[UsuarioRepository] Verificando existência de usuário com nome: ${usuario.nome} ou cpf: ${usuario.cpfCnpj}`);
      const existe = await this.existePorNomeOuCpfCpnj(usuario.nome, usuario.cpfCnpj);
      if (existe) {
        console.warn('[UsuarioRepository] Já existe usuário com esse nome ou cpfCnpj');
        throw new Error('Já existe usuário com esse CpfCpnj ou nome');
      }

      const conn = await connect();
      console.log('[UsuarioRepository] Inserindo usuário no banco...');
      const [result] = await conn.execute(
        'INSERT INTO Usuarios (nome, cpfCpnj, senha, idClientAssas) VALUES (?, ?, ?, ?)', 
        [usuario.nome, usuario.cpfCnpj, usuario.senha, usuario.idClientAssas]
      );

      const insertId = (result as any).insertId;
      console.log(`[UsuarioRepository] Usuário criado com ID: ${insertId}`);

      return {
        id: insertId,
        nome: usuario.nome,
        cpfCpnj: usuario.cpfCnpj,
        idClientAssas: usuario.idClientAssas,
      };
    } catch (error) {
      console.error('[UsuarioRepository] Erro no método criar:', error);
      throw error;
    }
  }

  async logar(cpfCpnj: string, senha: string): Promise<Usuario | null> {
    try {
      console.log(`[UsuarioRepository] Tentando logar usuário com cpfCpnj: ${cpfCpnj}`);
      const conn = await connect();
      const [rows] = await conn.execute(
        'SELECT id, nome, cpfCpnj FROM Usuarios WHERE cpfCpnj = ? AND senha = ?',
        [cpfCpnj, senha]
      );

      const results = rows as any[];
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
    } catch (error) {
      console.error('[UsuarioRepository] Erro no método logar:', error);
      throw error;
    }
  }

  async existePorNomeOuCpfCpnj(nome: string, cpfCpnj: string): Promise<boolean> {
    try {
      console.log(`[UsuarioRepository] Verificando existência por cpf ou nome: cpfCpnj=${cpfCpnj}, nome=${nome}`);
      const conn = await connect();
      const [rows] = await conn.execute(
        'SELECT COUNT(*) as count FROM Usuarios WHERE cpfCpnj = ? OR nome = ?',
        [cpfCpnj, nome]
      );

      const count = (rows as any)[0].count as number;
      console.log(`[UsuarioRepository] Resultado da verificação: ${count} encontrado(s)`);
      return count > 0;
    } catch (error) {
      console.error('[UsuarioRepository] Erro no método existePorNomeOuCpfCpnj:', error);
      throw error;
    }
  }
  
}
