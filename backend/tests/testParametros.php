<?php

// Captura parâmetros de datas da URL via método GET
$dataInicio = isset($_GET['data_inicio']) ? trim($_GET['data_inicio']) : null;
$dataFim = isset($_GET['data_fim']) ? trim($_GET['data_fim']) : null;

// Output dos parâmetros capturados
echo "<h2>Parâmetros Capturados</h2>";
echo "<p><strong>Data de Início:</strong> " . htmlspecialchars($dataInicio) . "</p>";
echo "<p><strong>Data de Fim:</strong> " . htmlspecialchars($dataFim) . "</p>";
echo "<p><strong>Tamanho da Data de Fim:</strong> " . strlen($dataFim) . "</p>";

// Função de validação para as datas
function validarDatas($dataInicio, $dataFim) {
    $pattern = '/^\d{4}-\d{2}-\d{2}$/';

    $validInicio = preg_match($pattern, $dataInicio);
    $validFim = preg_match($pattern, $dataFim);

    echo "<p><strong>Validação da Data de Início:</strong> " . ($validInicio ? "Válida" : "Inválida") . "</p>";
    echo "<p><strong>Validação da Data de Fim:</strong> " . ($validFim ? "Válida" : "Inválida") . "</p>";

    return $validInicio && $validFim;
}

validarDatas($dataInicio, $dataFim);

?>