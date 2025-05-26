"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = connect;
const promise_1 = __importDefault(require("mysql2/promise"));
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
async function connect() {
    try {
        const pool = await promise_1.default.createConnection(config);
        return pool;
    }
    catch (err) {
        console.error('Erro ao conectar no SQL Server:', err);
        throw err;
    }
}
