const { registerUser } = require('../services/user.service');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const generateTokenAndSetCookie = require('../utils/generateJWT');

// Função assíncrona para registrar um novo usuário
const signup = async (req, res) => {
    const userData = req.body;

    try {
        const { nome, email, senha } = userData;

        // Verificar se o email já está em uso
        User.findByEmail(email, async (err, user) => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao verificar usuário' });
            }

            if (user) {
                return res.status(400).json({ error: 'O email já está em uso' });
            }

            // Gera um salt e hasheia a senha para criptografia
            const salt = await bcrypt.genSalt(10);
            const senhaHash = await bcrypt.hash(senha, salt);

            // Atualiza os dados do usuário com a senha hasheada
            const newUserData = { nome, email, senha: senhaHash };

            // Chama a função para registrar o usuário no banco de dados
            registerUser(newUserData, (err, newUser) => {
                if (err) {
                    return res.status(400).json({ message: 'Erro ao registrar usuário' });
                }

                // Gera um token JWT e define o cookie
                generateTokenAndSetCookie(newUser.id, res);

                // Retorna o usuário registrado em caso de sucesso
                res.status(201).json({ message: 'Usuário registrado com sucesso' });
            });
        });

    } catch (err) {
        res.status(500).json({ message: 'Erro no registro do usuário' });
    }
};

// Função assíncrona para logar no usuário já criado
const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Procura um usuário com o email fornecido
        User.findByEmail(email, async (err, user) => {
            if (err) {
                return res.status(500).json({ error: 'Erro interno no servidor' });
            }

            if (!user) {
                return res.status(400).json({ error: 'Email ou senha inválido' });
            }

            // Verificar se a senha do usuário está disponível
            if (!user.SENHA) {
                return res.status(500).json({ error: 'Erro interno no servidor' });
            }

            // Compara a senha fornecida com a senha hasheada armazenada
            const isPasswordCorrect = await bcrypt.compare(senha, user.SENHA || "");

            if (!isPasswordCorrect) {
                return res.status(400).json({ error: 'Email ou senha inválido' });
            }

            // Gera um token e define um cookie na resposta
            generateTokenAndSetCookie(user.ID, res);

            // Retorna uma resposta de sucesso com o nome e email do usuário
            res.status(200).json({
                nome: user.NOME,
                email: user.EMAIL
            });
        });

    } catch (error) {
        res.status(500).json({ error: "Erro interno do servidor" });
    }
};

const logout = (req, res) => {
   try {
    res.cookie("jwt","", {maxAge: 0})
    res.status(200).json({message:"Logout realizado com suceso"})
   }

   catch {
    console.log("Erro no controller de logout", error.message);
    res.status(500).json({error: "Erro interno do servidor de logout"})
   }
};

module.exports = {
    signup,
    login,
    logout,
};
