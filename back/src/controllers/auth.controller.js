const { registerUser } = require('../services/user.service')


const signup = (req, res) => {
     const userData = req.body;

     console.log('Recebido dados de registro:', userData);

     registerUser(userData, (err, newUser) => {
        if (err) { 
            console.error('Erro ao registrar usuário:', err.message);
            return res.status(400).json({ message: err.message});
        }

        res.status(201).json(newUser);
     });
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
