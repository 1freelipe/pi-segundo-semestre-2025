<?php

header("Access-Control-Allow-Origin: *");
header("Content-type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

$id = $_GET['id'] ?? null;

if (!$id) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "ID não fornecido"]);
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
        UPDATE pecas_servico SET
            PECASSER_NOME = :nome,
            PECASSER_CATEGORIA = :categoria,
            PECASSER_DESCRICAO = :descricao,
            PECASSER_ESTOQUE = :estoque,
            PECASSER_PRECO_UNITARIO = :preco_uni,
            PECASSER_PRECO_VENDA = :preco_venda,
            PECASSER_MARGEM = :margem
        WHERE PECASSER_ID = :id
    ");

    $stmt->bindValue(':id', $id, PDO::PARAM_INT);
    $stmt->bindValue(':nome', $data->nome);
    $stmt->bindValue(':categoria', $data->categoria);
    $stmt->bindValue(':descricao', $data->descricao);
    $stmt->bindValue(':estoque', $data->estoque);
    $stmt->bindValue(':preco_uni', $data->preco_unitario);
    $stmt->bindValue(':preco_venda', $data->preco_venda);
    $stmt->bindValue(':margem', $data->margem);

    $stmt->execute();

    http_response_code(200);
    echo json_encode(["success" => true, "message" => "Peça atualizada com sucesso"]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Erro ao atualizar: " . $e->getMessage()]);
}
?>
