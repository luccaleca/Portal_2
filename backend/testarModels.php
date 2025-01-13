<?php
require_once(__DIR__ . '/models/dashboard/sumario/SumarioVideoChamdaModel.php');

// Testando o modelo
try {
    $resultado = SumarioVideoChamadaModel::getResumoVendasVideoChamada();
    if ($resultado) {
        echo "Vendas Totais: " . $resultado['VENDAS_TOTAIS'] . PHP_EOL;
        echo "Número de Vendas Totais: " . $resultado['NUM_VENDAS_TOTAIS'] . PHP_EOL;
        echo "Ticket Médio Total: " . $resultado['TICKET_MEDIO_TOTAL'] . PHP_EOL;
    } else {
        echo "Nenhum resultado encontrado." . PHP_EOL;
    }
} catch (Exception $e) {
    echo "Erro ao executar a consulta: " . $e->getMessage() . PHP_EOL;
}