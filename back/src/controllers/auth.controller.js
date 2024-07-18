const { registerUser } = require('../services/user.service')
const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const generateTokenAndSetCookie = require('../utils/generateJWT');

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
     const salt = await bcrypt.genSalt(10);
     const senhaHash = await bcrypt.hash(senha, salt);

     //atualiza os dados do usuario com a senha hasheada
     const newUserData = { nome, email, senha: senhaHash };

     //chama a função para registrar o usuário no banco de dados
     registerUser(newUserData, (err, newUser) => {
        if (err) { 
            console.error('Erro ao registrar usuário:', err.message);
            return res.status(400).json({ message: err.message});
        }

        //gerar um token JWT e define o cookie
        generateTokenAndSetCookie(newUser.id, res);

        //retorna o usuario registrado em caso de sucesso
        res.status(201).json(newUser);
     });
    });

} catch (err) {
    console.error('Erro no registro do usuário:', err.message);
    res.status(500).json({ message: 'Erro no registro do usuario'});
    }
};

//cria uma função assincrona para logar no usuario ja criado
const login = async (req, res) => {
    const {email, senha } = req.body;

    try {
        // Procura um usuario com o email fornecido
         User.findByEmail( email, async (err, user) => {
            if(err) {
                console.log('Erro ao procurar usuário:', err.message);
                return res.status(500).json({ error: 'Erro interno no servidor'});
            }

            if (!user) {
                return res.status(400).json({ error: 'Email ou senha inválido' });
            }

            //Verificar se a senha do usuario esta disponível
            if (!user.senha) {
                console.log('Senha do usuario não encontrada');
                return res.status(500).json({ error: 'Erro interno no servidor'});
            }


        const isPasswordCorrect = await bcrypt.compare(senha, user.password);

        if(!isPasswordCorrect) {
            return res.status(400).json({ error: "Email ou senha inválido"})
        }
        //Gera um token e define um cookie na resposta
        generateTokenAndSetCookie(user._id, res);

        //retorna uma resposta de sucesso com o nome e email do usuario
        res.status(200).json({
            nome: user.nome,
            email: user.email
        });
    });
        

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error"})
    }

   
};


const logout = (req, res) => {
    // Limpa o cookie JWT
    res.cookie("jwt", "", {
        maxAge: 0,
        httpOnly: true,
        sameSite: "strict"
    });
    res.send('Página de Logout');
};

module.exports = {
    signup,
    login,
    logout,
};
