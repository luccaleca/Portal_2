<?php


//captura de URI solicitada pelo cliente, ignorando os parametros
$route = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/'); //aqui ele vai puxar a url a partir da primeira / (que seria depois do localhost)
                                                                    //trim serve para remover / do inicio e do fim de uma string

//mapeamos as rotas para  puxar os controladores e seus metodos
$routes = [
    'dashboard' => 'DashboardController@index' //@ serve para indicar que estamos querendo acessar o metodo index 
];

//função para transformar a rota  em uma chamada para a ação
function dispatchRoutesParaControllers($route, $routes) {
    //verifica se a rota esta definida
    if(array_key_exists($route, $routes)) {
        //separa controlador do metodo (explode)
        list($controller, $method) = explode('@', $routes[$route]);

        //caminho do controlador
        $controllerPath =  __DIR__ . "/../controllers/${controller}.php";

        //verifica se o arquivo do controlador esta presente
        if(file_exists($controllerPath)) {
            //inclui o arquivo do controlador
            require_once $controllerPath;

            //cria uma instancia do controlador
            $controllerInstance = new $controller();

            //verifica se o metodo do controlador existe
            if(method_exists($controllerInstance, $method)) {
                //executa o metodo do controlador
                $controllerInstance->$method();
            } else {
                echo "Metodo nao encontrado." . htmlspecialchars($method);
            }
        } else {
            echo "Controlador não encontrado" .htmlspecialchars($controller);
        }
    } else {
        http_response_code(404);
        echo "Rota não encontrada";
    }

}