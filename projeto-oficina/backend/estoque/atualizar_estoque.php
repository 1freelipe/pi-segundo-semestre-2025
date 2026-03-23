<?php

header("Access-Control-Allow-Origin: *");
header("Content-type: application/json; charset=UTF-8");
// 💡 MÉTODOS PERMITIDOS: PUT é necessário para a atualização
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS"); 
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../config/db.php';

// Trata requisições OPTIONS (CORS Pre-flight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Lê o ID da URL (GET) e os dados do corpo (PUT/JSON)
$id_peca = $_GET['id'] ?? null;
$data = json_decode(file_get_contents("php://input")); // Lê o JSON do corpo

// 1. Validação dos Dados Essenciais
if (empty($id_peca) || !isset($data->quantidade)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "ID da peça e nova quantidade são obrigatórios."
    ]);
    exit;
}

try {
    $quantidade = $data->quantidade;
    
    // 2. Busca a categoria da peça no banco (necessário para a regra de negócio)
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

    // 3. 🛑 VALIDAÇÃO DE REGRA DE NEGÓCIO: Só permite atualização para categoria 'P' (Peças)
    if ($categoria !== 'P') { 
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Atualização de estoque só é permitida para Peças (Categoria P)."
        ]);
        exit;
    }

    // 4. Chamada da Procedure
    $stmt = $pdo->prepare("CALL STP_ATUALIZA_ESTOQUE(:id, :quantidade)");
    
    // 💡 CORREÇÃO DE TIPAGEM: Envia a quantidade como STR/FLOAT, garantindo precisão.
    $quantidade_float = floatval($quantidade); 
    
    $stmt->bindValue(':id', $id_peca, PDO::PARAM_INT);
    $stmt->bindValue(':quantidade', $quantidade_float); // PDO envia o float/number corretamente

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