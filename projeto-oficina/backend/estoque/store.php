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

// 💡 FUNÇÃO HELPER: Garante que campos vazios de números virem NULL/0, evitando o Strict Mode SQL
function getDbValue($data, $key, $isNumeric = false) {
    $value = $data[$key] ?? null; 
    
    // Se o valor for null ou string vazia, retorna null
    if ($value === null || $value === '') {
        return null;
    }

    // Se for numérico, limpa o valor e o retorna como float
    if ($isNumeric) {
        // Remove caracteres de moeda e tenta converter para float. Se falhar, retorna 0.
        $cleaned = str_replace(['R$', ',', '.'], ['', '', '.'], $value);
        return is_numeric($cleaned) ? (float) $cleaned : 0;
    }
    
    // Sanitiza e retorna a string
    return htmlspecialchars(strip_tags($value));
}

try {
    $sql = "INSERT INTO tb_pecas_servico
        (PECAS_SER_NOME, PECAS_SER_CATEGORIA, PECAS_SER_DESCRICAO, PECAS_SER_ESTOQUE, 
         PECAS_SER_PRECO_UNITARIO, PECAS_SER_PRECO_VENDA, PECAS_SER_MARGEM)
        VALUES (:nome, :categoria, :descricao, :estoque, :preco_uni, :preco_venda, :margem)
    ";

    $stmt = $pdo->prepare($sql);

    // 1. Sanitização e obtenção dos valores prontos para o DB
    $nome = getDbValue($data, 'nome');
    $categoria = getDbValue($data, 'categoria');
    $descricao = getDbValue($data, 'descricao');
    
    // 💡 Campos Numéricos (passar 'true'): Vazio será NULL ou 0 (ajustar conforme a coluna)
    // Se a coluna for NOT NULL, a função deve retornar 0, mas vou manter NULL como padrão para flexibilidade.
    $estoque = getDbValue($data, 'quantidade', true); 
    $preco_uni = getDbValue($data, 'preco_unitario', true); 
    $preco_venda = getDbValue($data, 'preco_venda', true); 
    $margem = getDbValue($data, 'LUCRO_BRUTO', true); 

    // 2. Bind dos valores
    $stmt->bindValue(':nome', $nome);
    $stmt->bindValue(':categoria', $categoria);
    $stmt->bindValue(':descricao', $descricao);
    
    // 💡 Bind dos Numéricos: O PDO fará o cast correto (NULL ou número)
    $stmt->bindValue(':estoque', $estoque); 
    $stmt->bindValue(':preco_uni', $preco_uni); 
    $stmt->bindValue(':preco_venda', $preco_venda); 
    $stmt->bindValue(':margem', $margem);

    if($stmt->execute()) {
        http_response_code(200);
        echo json_encode(["success" => true, "message" => "Peça cadastrada com sucesso."]);
    } else {
        http_response_code(200);
        // Em caso de falha silenciosa
        echo json_encode(['success' => false, 'message' => 'Ocorreu um erro ao tentar cadastrar a peça.']);
    }

} catch (PDOException $e) {
    if($e->getCode() === '23000') {
        // Erro de Chave Duplicada (Ex: nome da peça UNIQUE)
        http_response_code(409);
        echo json_encode(["success" => false, "message" => "O nome da peça já existe ou ocorreu duplicidade."]);
    } else {
        // Erro Geral de Banco de Dados (Inclui erros de tipagem do Strict Mode não capturados)
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Erro ao cadastrar: " . $e->getMessage()]);
    }
}
?>