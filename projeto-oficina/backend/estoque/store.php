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

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Nenhum dado enviado"]);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO tb_pecas_servico
        (PECAS_SER_NOME, PECAS_SER_CATEGORIA, PECAS_SER_DESCRICAO, PECAS_SER_ESTOQUE, 
         PECAS_SER_PRECO_UNITARIO, PECAS_SER_PRECO_VENDA, PECAS_SER_MARGEM)
        VALUES (:nome, :categoria, :descricao, :estoque, :preco_uni, :preco_venda, :margem)
    ");

    $nome = htmlspecialchars(strip_tags($data['nome'] ?? ''));
    $categoria = htmlspecialchars(strip_tags($data['categoria'] ?? ''));
    $descricao = htmlspecialchars_decode(strip_tags($data['descricao'] ?? ''));
    $estoque = htmlspecialchars(strip_tags($data['estoque'] ?? ''));
    $preco_uni = htmlspecialchars(strip_tags($data['preco_unitario'] ?? ''));
    $preco_venda = htmlspecialchars(strip_tags($data['preco_venda'] ?? ''));
    $margem = htmlspecialchars(strip_tags($data['LUCRO_BRUTO'] ?? 0));

    $stmt->bindValue(':nome', $nome);
    $stmt->bindValue(':categoria', $categoria);
    $stmt->bindValue(':descricao', $descricao);
    $stmt->bindValue(':estoque', $estoque);
    $stmt->bindValue(':preco_uni', $preco_uni);
    $stmt->bindValue(':preco_venda', $preco_venda);
    $stmt->bindValue(':margem', $margem);

    if($stmt->execute()) {
        http_response_code(200);
        echo json_encode(["success" => true, "message" => "Peça cadastrada com sucesso."]);
    } else {
        http_response_code(200);
        echo json_encode(['success' => false, 'message' => 'Ocorreu um erro ao tentar cadastrar a peça.']);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Erro ao cadastrar: " . $e->getMessage()]);
}
?>
