<?php

header("Access-Control-Allow-Origin: *");
header("Content-type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
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

try {
    $stmt = $pdo->prepare("DELETE FROM tb_pecas_servico WHERE PECAS_SER_ID = ?");
    $stmt->execute([$id]);

    if($stmt->rowCount() > 0 ){
        http_response_code(200);
        echo json_encode(["success" => true, "message" => "Peça excluída com sucesso"]);
    } else {
        http_response_code(200);
        echo json_encode(['success' => false, 'message' => 'Não foi possível excluir a peça.']);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Erro ao excluir: " . $e->getMessage()]);
}
?>
