<?php

header("Access-Control-Allow-Origin: *");
header("Content-type: application/json; charset=UTF-8");
// 💡 CORREÇÃO 1: Adiciona o método PUT para requisições de atualização
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS"); 
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../config/db.php';

// Trata requisições OPTIONS (CORS Pre-flight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 💡 CORREÇÃO 2: Lê o ID da URL (GET) e os dados do corpo (PUT/JSON)
$id_peca = $_GET['id'] ?? null;
$data = json_decode(file_get_contents("php://input")); // Lê o JSON do corpo

// 3. Validação dos Dados Essenciais
if (empty($id_peca) || !isset($data->quantidade)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "ID da peça e nova quantidade são obrigatórios."
    ]);
    exit;
}

// 4. Lógica de Validação e Execução
try {
    $quantidade = $data->quantidade;
    
    // 4.1. Busca a categoria da peça para validação
    $stmt_categoria = $pdo->prepare("SELECT PECAS_SER_CATEGORIA FROM tb_pecas_servico WHERE PECAS_SER_ID = ?");
    $stmt_categoria->execute([$id_peca]);
    $peca = $stmt_categoria->fetch(PDO::FETCH_ASSOC);

    if (!$peca) {
        http_response_code(404);
        echo json_encode([
            "success" => false,
            "message" => "Peça não encontrada."
        ]);
        exit;
    }
    
    $categoria = $peca['PECAS_SER_CATEGORIA'];

    // 4.3. Chamada da Procedure
    $stmt = $pdo->prepare("CALL STP_ATUALIZA_ESTOQUE(:id, :quantidade)");
    $stmt->bindValue(':id', $id_peca, PDO::PARAM_INT); // Usamos o ID da URL
    $stmt->bindValue(':quantidade', $quantidade, PDO::PARAM_INT);

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