<?php
// Configurações do Banco de Dados Firebird
$host = '192.168.30.252'; // Host do banco de dados
$port = '3051'; // Porta do Firebird
$dbName = 'C:\SavWinRevo\Servidor\DataBase\BDSAVWINREVO.FDB'; // Caminho completo para o arquivo .FDB
$user = 'sysdba'; // Usuário do banco de dados
$password = 'masterkey'; // Senha do banco de dados

//DSN = Data Source Name = é uma string de conexão que especifica informações para se conectar em um banco de dados específico
$dsn = "firebird:dbname=C:\SavWinRevo\Servidor\DataBase\BDSAVWINREVO.FDB";

try {
    //criando uma nova instância de PDO (PHP Data Object - extensão php que fornece interface para acessar SGBDs) para Firebird
    $pdo = new PDO($dsn, $user, $password);

    //Configurando o metodo do PDO para lançar exceções
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    echo "Conexão bem-sucedida ao banco de dados da Ótica Santo Grau (Firebird)"; //acerto
} catch (PDOException $e) {
    //Tratamento de erro: Exibir mensagem de erro de forma segura
    echo "Erro ao conectar ao banco de dados". $e->getMessage();  //erro
}