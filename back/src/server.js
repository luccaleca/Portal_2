const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

//carrega as variaveis de ambiente do arquivo dotenv
dotenv.config();

const app = express();
app.use(bodyParser.json());

// Definir limite máximo de ouvintes para evitar o aviso
require('events').EventEmitter.prototype._maxListeners = 20;

const PORT = process.env.PORT || 5000;

//conectar ao banco de dados

connectDB((db) => {
    app.locals.db = db;
    console.log('Conectado ao banco de dados IbExpert');

    // Rotas
    const routes = require('./routes');
    app.use('/', routes);


    

app.get('/', (req, res) => {
    res.send('Bem vindo ao Dashboard');
});



    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
});