<?php

require_once(__DIR__ . '/../../../config/database.php');

class SumarioVideoChamadaModel {
    public static function getResumoVendasVideoChamada($dataInicio, $dataFim) {
        $conn = conectarBanco(); //objeto de conexao nativo do pdo

        $queryVideoChamadaVendas="
        SELECT 
            SUM(l.LCTVALOR) AS VENDAS_TOTAIS,
            COUNT(e.PEDSEQUENCIAL) AS NUM_VENDAS_TOTAIS,
            SUM(l.LCTVALOR) / COUNT(e.PEDSEQUENCIAL) AS TICKET_MEDIO_TOTAL
        FROM TB_VND_VENDEDOR a
        INNER JOIN TB_PES_PESSOA b ON b.PESID = a.PESID 
        INNER JOIN TB_DMV_DETALHEMETAVEND c ON c.VNDID = a.VNDID 
        INNER JOIN TB_MTV_METASVENDEDOR d ON d.MTVID = c.MTVID
        INNER JOIN TB_PED_PEDIDO e ON e.VNDID_PRIMEIRO = a.VNDID
        INNER JOIN TB_VPE_VENDAPEDIDOS f ON f.PEDID_PEDIDO = e.PEDID
        INNER JOIN TB_VEN_VENDA g ON g.VENID = f.VENID_VENDA
        INNER JOIN TB_LTV_LANCAMENTOVENDA h ON h.VENID = g.VENID
        INNER JOIN TB_LCT_LANCAMENTOS l ON l.LCTID = h.LCTID
        WHERE l.LCTDATALANCAMENTO >= :dataInicio
        AND l.LCTDATALANCAMENTO <= :dataFim
        AND d.MTVVALORMETA = 40000
        AND e.FILID_FILIAL = '5'
        AND e.MCVID IS NULL;
        ";

        $stmt = $conn->prepare($queryVideoChamadaVendas);  // -> comando para acessar metodos da classe conn do PDO, que executa comandos de banco de dados
       // Preparando a consulta
       $stmt->bindParam(':dataInicio', $dataInicio); 
       $stmt->bindParam(':dataFim', $dataFim);
       
       // Executar a consulta e retornar o resultado
       $stmt->execute();
       return $stmt->fetch(PDO::FETCH_ASSOC);
   }
}