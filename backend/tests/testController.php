<?php
// Inclua o arquivo contendo a classe DashboardController
require_once('../controllers/DashboardController.php'); 

// Instancie o controlador
$dashboard = new DashboardController();

// Chame o método 'index' que deve lidar com as operações e mostrar o resultado
$dashboard->index();