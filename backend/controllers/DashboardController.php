<?php


require_once(__DIR__ . '/../models/dashboard/sumario/SumarioTotalModel.php'); 
require_once('C:/xampp/htdocs/lucca/portal_2/backend/models/dashboard/sumario/SumarioVideoChamadaModel.php');
require_once(__DIR__ . '/../models/dashboard/sumario/SumarioWhatsAppModel.php');

class DashboardController {

    //método principal do controlador, gerencia requisições e respostas
    public function index() {
        //captura parametros de datas da URL vindo via método GET
        $dataInicio=isset($_GET['data_inicio']) ? $_GET['data_inicio']:null; //verifica se o que vier do GET é definido e nao nula, se nao cumprir isso retorna null ? :(operadorador ternario)
        $dataFim=isset($_GET['data_fim'])? $_GET['data_fim']:null;

        //validar a presença de dados
        if(!$dataInicio || !$dataFim) {
            echo "Forneça ambas as datas de inicio e fim";
            return;
        }
        //entregamos os valores para os parametros do metodo aplicarFiltroData
        $resultado = $this->aplicarFiltroData($dataInicio, $dataFim);

        // Mostra o resultado para fins de depuração
        echo "<pre>";
        print_r(json_decode($resultado, true));
        echo "</pre>";

        echo $resultado; // Exibe o resultado JSON
    }

    // Método para validar o formato das datas
    private function validarDatas($dataInicio, $dataFim) {
        $pattern = '/^\d{4}-\d{2}-\d{2}$/';
        return preg_match($pattern, $dataInicio) && preg_match($pattern, $dataFim);
    }

    // Método público para filtrar dados com base nas datas
    public function aplicarFiltroData($dataInicio, $dataFim) {
        // Valide as datas logo no início
        if (!$this->validarDatas($dataInicio, $dataFim)) {
            return "Datas inválidas. Certifique-se de que estão no formato ano-mês-dia.";
        }

        // Tenta realizar as consultas nos modelos se as datas são válidas
        try {
            $sumarioTotal = SumarioTotalModel::getResumoVendasTotal($dataInicio, $dataFim);
            $sumarioWhatsApp = SumarioWhatsAppModel::getResumoVendasWhatsApp($dataInicio, $dataFim);
            $sumarioVideoChamada = SumarioVideoChamadaModel::getResumoVendasVideoChamada($dataInicio, $dataFim);

            $resultados = [
                'sumarioTotal' => $sumarioTotal,
                'sumarioWhatsApp' => $sumarioWhatsApp,
                'sumarioVideoChamada' => $sumarioVideoChamada,
            ];

            return json_encode($resultados); // Converte o resultado em uma string JSON

        } catch (Exception $e) {
            return "Erro ao processar a requisição: " . $e->getMessage();
        }
    }

    
}

