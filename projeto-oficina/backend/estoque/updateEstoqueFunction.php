<?php

require_once '../config/db.php';

$data = json_decode(file_get_contents("php://input"));

$id  = $data->id ?? null;
$qtd = $data->quantidade ?? null;

if (!$id || $qtd === null) {
    echo json_encode([
        "success" => false,
        "message" => "ID e quantidade são obrigatórios."
    ]);
    exit;
}

try {

    
    $stmt = $pdo->prepare("
        SELECT PECAS_SER_ESTOQUE 
        FROM TB_PECAS_SERVICO 
        WHERE PECA_SSER_ID = :id
    ");
    $stmt->execute([':id' => $id]);
    $item = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$item) {
        echo json_encode(["success" => false, "message" => "Item não encontrado"]);
        exit;
    }

    $estoqueAtual = $item['PECAS_SER_ESTOQUE'];

    
    $stmt2 = $pdo->prepare("
        SELECT FNC_ESTOQUE_ATUAL(:estoque, :qtd) AS novo
    ");
    $stmt2->execute([
        ':estoque' => $estoqueAtual,
        ':qtd'     => $qtd
    ]);

    $result = $stmt2->fetch(PDO::FETCH_ASSOC);
    $novoEstoque = $result['novo'];

    
    $stmt3 = $pdo->prepare("
        UPDATE TB_PECAS_SERVICO
        SET PECAS_SER_ESTOQUE = :novo
        WHERE PECA_SSER_ID = :id
    ");
    $stmt3->execute([
        ':novo' => $novoEstoque,
        ':id'   => $id
    ]);

    echo json_encode([
        "success" => true,
        "estoque_anterior" => $estoqueAtual,
        "estoque_atual"    => $novoEstoque,
        "message" => "Estoque atualizado com sucesso"
    ]);

} catch (PDOException $e) {

    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
?>
