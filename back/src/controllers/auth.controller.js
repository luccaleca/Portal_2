const login = (req, res) => {
    res.send('Pagina de login');
};

const signup = (req, res) => {
    res.send('Página de Cadastro');
};

const logout = (req, res) => {
    res.send('Página de Logout');
};

module.exports = {
    login,
    signup,
    logout,
};
