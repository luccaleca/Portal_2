//Importa o modelo User do arquivo user.model
const User = require('../models/user.model');

const registerUser = (userData, callback) => {
    // Aqui pode adicionar validações ou lógicas adicionais antes de chamar o método do modelo

    //Verifica se algum dado necessarios do modelo de usuario esta vazio ou inválido
    if (!userData.nome || !userData.email || !userData.senha) {
        console.error('Dados incompletos para registro de usuario');
        
        //se ele estiver vazio ou invalido, chama o callback como erro e encerra a execução
        return callback(new Error('Dados incompletos para o registro do usuário'));
    }

    
    // Chama o método create do modelo user para criar um novo usuario com os dados fornecidos
    // Passa o userData e o callback para lidar com o resultado da operação de criação
    console.log('Registrando usuário com dados:', userData);
    User.create(userData, callback);
};


module.exports = { registerUser, }
