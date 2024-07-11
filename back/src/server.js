const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./db/connectToIBExpertDB.js');
const authRoutes = require("./routes/auth.routes.js");



const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

//carrega as variaveis de ambiente do arquivo dotenv
dotenv.config();

// Definir limite máximo de ouvintes para evitar o aviso
require('events').EventEmitter.prototype._maxListeners = 20;



//conectar ao banco de dados

connectDB((db) => {
    app.locals.db = db;
    console.log('Conectado ao banco de dados IbExpert');

    // Middleware de rotas
    app.use("/api/auth", authRoutes);

    

app.get('/', (req, res) => {
    // root route http://localhost:5000/
    res.send('Bem vindo ao Portal 2');
});



          //Iniciar servidor
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
});