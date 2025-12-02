<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

try {
    $stmt = $pdo->prepare('SELECT PECAS_SER_ID, PECAS_SER_NOME, PECAS_SER_CATEGORIA, PECAS_SER_ESTOQUE, PECAS_SER_DESCRICAO, PECAS_SER_PRECO_UNITARIO, PECAS_SER_PRECO_VENDA, PECAS_SER_MARGEM FROM tb_pecas_servico');
    $stmt->execute();
    
    $estoque = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if($estoque) {
        http_response_code(200);
        echo json_encode(['success' => true, 'estoque' => $estoque]);
    } else {
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'É necessário ter ao menos uma peça cadastrada para visualizar.']);
    }
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Ocorreu um erro ao tentar se conectar com o servidor: ' . $e->getMessage()]);
}

?>