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

$data = json_decode(file_get_contents("php://input"));

if (!$data) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Nenhum dado enviado"]);
    exit;
}

try {
    $stmt = $pdo->prepare("
        INSERT INTO pecas_servico
        (PECASSER_NOME, PECASSER_CATEGORIA, PECASSER_DESCRICAO, PECASSER_ESTOQUE, 
         PECASSER_PRECO_UNITARIO, PECASSER_PRECO_VENDA, PECASSER_MARGEM)
        VALUES (:nome, :categoria, :descricao, :estoque, :preco_uni, :preco_venda, :margem)
    ");

    $stmt->bindValue(':nome', $data->nome);
    $stmt->bindValue(':categoria', $data->categoria);
    $stmt->bindValue(':descricao', $data->descricao);
    $stmt->bindValue(':estoque', $data->estoque);
    $stmt->bindValue(':preco_uni', $data->preco_unitario);
    $stmt->bindValue(':preco_venda', $data->preco_venda);
    $stmt->bindValue(':margem', $data->margem);

    $stmt->execute();

    http_response_code(201);
    echo json_encode(["success" => true, "message" => "Peça cadastrada com sucesso"]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Erro ao cadastrar: " . $e->getMessage()]);
}
?>
