const connectDB = require('../db/connectToIBExpertDB');

const User = {
    // Método para criar um novo usuário
    create: (userData, callback) => {
        const { nome, email, senha } = userData;

        connectDB((db) => {
            const insertQuery = `
                INSERT INTO TB_USUARIOS_PORTAL2 (ID, NOME, EMAIL, SENHA)
                VALUES (GEN_ID(gen_tb_usuarios_portal2_id, 1), ?, ?, ?)
            `;
            db.query(insertQuery, [nome, email, senha], (insertErr) => {
                db.detach();
                if (insertErr) {
                    return callback(new Error('Erro ao registrar usuário'));
                }
                return callback(null, { id: db.insertId, nome, email, senha });
            });
        });
    },
    // Método para encontrar um usuário pelo email
    findByEmail: (email, callback) => {
        connectDB((db) => {
            const query = 'SELECT ID, NOME, EMAIL, SENHA FROM TB_USUARIOS_PORTAL2 WHERE EMAIL = ?';
            db.query(query, [email], (err, result) => {
                db.detach();
                if (err) {
                    return callback(err);
                }
                if (result.length === 0) {
                    return callback(null, null); // Nenhum usuário encontrado
                }
                return callback(null, result[0]);
            });
        });
    }
};

module.exports = User;
