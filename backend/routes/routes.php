<?php
$uri




//estrutura condicional para encotnrar as rotas
if($_SERVER['REQUEST_URI'] === '/dashboard' && $_SERVER['REQUEST_METHOD'] ==='GET') {

    require_once 'controllers/DashboardController.php';

    $controller = new DashboardController();
    $controller->index();
} else {
    http_response_code(404);
    echo "Rota não encontrada";
}












