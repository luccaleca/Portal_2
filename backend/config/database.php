<?php
require __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;


// Carregando o dotenv na raiz
$dotenv = Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

function conectarBanco() {
    try {
        $host = $_ENV['DB_HOST'];
        $port = $_ENV['DB_PORT'];
        $dbName = $_ENV['DB_NAME'];
        $user = $_ENV['DB_USER'];
        $password = $_ENV['DB_PASSWORD'];

        $dsn = "firebird:dbname={$host}/{$port}:{$dbName}";

        $pdo = new PDO($dsn, $user, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        


        return $pdo; // Retorne a instância PDO

    } catch (PDOException $e) {
        // Em log ou exceção
        throw new Exception("Erro ao conectar ao banco de dados: " . $e->getMessage());
    }
}

// Chamando a função para testar a conexão
try {
    conectarBanco();
} catch (Exception $e) {
    echo $e->getMessage();
}
?>
