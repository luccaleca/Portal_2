//importar  a função connectDB do modulo de banco de dados
const connectDB = require('../db/connectToIBExpertDB');

//Definimos o bojeto User com o método create
const User = {
    create: (userData, callback) => {
        //Destrutura os campos nome, email e senha do objeto userData
        const { nome, email, senha } = userData;
    

    //conecta ao banco de dados
    connectDB((db) => {
        if (!db) {
            return callback(new Error('Falha ao conectar ao banco de dados'));
        }
        //Define a consulta sql para inserir um novo usuário na tabela tb_usuarios_portal2
        const insertQuery = ` INSERT INTO TB_USUARIOS_PORTAL2 (id,nome, email, senha)
        VALUES (GEN_ID(gen_tb_usuarios_portal2_id, 1),?, ?, ?)
        `;
        //executa a consulta sql
        db.query(insertQuery, [nome, email, senha], (insertErr) => {
            //fecha a conexao com o banco de dados
            db.detach();
            // Se houver um erro ao inserir, chama a função callback com um erro
            if (insertErr) {
                console.log('Erro ao inserir usuario', insertErr);
                return callback(new Error('Erro ao registrar usuário'));
            } else {
                //Se a inserção for bem-sucedida, chama a função callback com null (sem erro) e os dados do usuario
                console.log('Usuario registrado com sucesso');
                return callback(null, {id:lastInsertId, nome, email, senha});
            }
        });
        });
    },
    //função para encontrar um usuario pelo email
    findByEmail: (email, callback) => {
        if (typeof callback !== 'function') {
            throw new TypeError ('callback is not a function');
        }
        connectDB((db) => {
            if (!db) {
                return callback(new Error('Falha ao conectar ao banco de dados'), null);
            }


            const selectQuery = 'SELECT * FROM TB_USUARIOS_PORTAL2 WHERE email = ?';
            //executa a consulta SQL para encontrar o resultado
            db.query(selectQuery, [email], (err, result) => {
                db.detach();
                if (err){ 
                return callback(err, null);
            } else {
                return callback(null, results.length > 0 ? results[0] : null);
            }
            });  
        });
    }
};

   

//exportar esse objeto User para que possa ser utilizado em outros módulos
module.exports = User;