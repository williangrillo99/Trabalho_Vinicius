import mysql from 'mysql2/promise';

const config = {
  user: 'sa',
  password: '1234567',
  server: 'localhost',
  port: 3306,
  database: 'master',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export async function connect() {
  try {
    const pool = await mysql.createConnection(config);
    return pool;
  } catch (err) {
    console.error('Erro ao conectar no SQL Server:', err);
    throw err;
  }
}