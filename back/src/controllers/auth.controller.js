const { registerUser } = require('../services/user.service')
const bcript = require('bcrypt')
const User = require('../models/user.model')

//cria uma função assincrona para registrar um novo usuario
const signup = async (req, res) => {
    //obtem os dados do corpo da requisição
     const userData = req.body;

     try {

     const { nome, email, senha } = userData;

        //verifica se o email ja esta em uso
     User.findByEmail(email, async (err, user) => {
        if (err) {
            console.log('Erro em verificar o usuario:', err.message);
            return res.status(500).json({ message: 'Erro ao verificar usuário'});
        }

     if(user) {
        return res.status(400).json({ error: 'O email ja esta em uso'});
     }

     //gera um salt e hasheia a senha para criptografia
     const salt = await bcript.genSalt(10);
     const senhaHash = await bcript.hash(senha, salt);

     //atualiza os dados do usuario com a senha hasheada
     const newUserData = { nome, email, senha: senhaHash };

     //chama a função para registrar o usuário no banco de dados
     registerUser(newUserData, (err, newUser) => {
        if (err) { 
            console.error('Erro ao registrar usuário:', err.message);
            return res.status(400).json({ message: err.message});
        }

        //retorna o usuario registrado em caso de sucesso
        res.status(201).json(newUser);
     });
    });

} catch (err) {
    console.error('Erro no registro do usuário:', err.message);
    res.status(500).json({ message: 'Erro no registro do usuario'});
    }
};

const login = (req, res) => {
    res.send('Pagina de login');
};


const logout = (req, res) => {
    res.send('Página de Logout');
};

module.exports = {
    signup,
    login,
    logout,
};
