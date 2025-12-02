<?php

header("Access-Control-Allow-Origin: *");
header("Content-type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../config/db.php';


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$data = json_decode(file_get_contents("php://input"));

// Validação
if (!isset($data->id) || !isset($data->quantidade) || !isset($data->categoria)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "ID, quantidade e categoria são obrigatórios."
    ]);
    exit;
}

// apenas peça pode mexer no estoque 
if ($data->categoria !== 'P') {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Atualização de estoque só é permitida para peças (categoria P)."
    ]);
    exit;
}

try {

    // chamando procedure
    $stmt = $pdo->prepare("CALL STP_ATUALIZA_ESTOQUE(:id, :quantidade)");
    $stmt->bindValue(':id', $data->id, PDO::PARAM_INT);
    $stmt->bindValue(':quantidade', $data->quantidade, PDO::PARAM_INT);

    $stmt->execute();

    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Estoque atualizado com sucesso!"
    ]);

} catch (PDOException $e) {

    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Erro ao atualizar estoque: " . $e->getMessage()
    ]);
}
?>
