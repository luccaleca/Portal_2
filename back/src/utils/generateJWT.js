// Importa a biblioteca jsonwebtoken, que é usada para criar , assinar e verificar tokens JWT (JSON Web Tokens)
const jwt = require('jsonwebtoken')


//Define a função generateTokenAndSetCookie que gera um token JWT e define um cookie na resposta HTTP
const generateTokenAndSetCookie = (userId, res) => {
    // Gerar um token JWT usando o método sign do jsonwebtoken
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '15d' //token expira em 15 dias
    })

    // define um cookie na resposta HTTP contendo o JWT gerado
    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, //configura a duração do cookie para 15 dias (em milissegundos)
        httpOnly: true, //o cookie nao pode ser acessado via JavaScript no lado do cliente, ajudando a prevenir ataques de Cross-Site Scripting (XSS)
        sameSite: "strict", //Define a política de SameSite para o cookie, ajudando a proteger contra ataques de Cross-Site Requet Forgery (CSRF)
        secure: process.env.NODE_ENV !== "development"
    });
};
module.exports = generateTokenAndSetCookie;