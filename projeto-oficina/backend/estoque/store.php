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

/**
 * Garante que campos vazios virem NULL (se permitido) ou 0 (se numérico e obrigatório).
 * @param array $data O array de dados do input.
 * @param string $key A chave do dado.
 * @param bool $isNumeric Se o campo é numérico.
 * @param bool $isMandatory Se o campo é obrigatório (NOT NULL no DB).
 * @return mixed O valor sanitizado, NULL ou 0.
 */
function getDbValue($data, $key, $isNumeric = false, $isMandatory = false) {
    $value = $data[$key] ?? null; 
    
    // Se o valor for null ou string vazia
    if ($value === null || $value === '') {
        // Se for obrigatório, retorna string vazia (para VARCHAR) ou 0 (para NUMÉRICO)
        if ($isMandatory) {
            return $isNumeric ? 0 : ''; 
        }
        // Se não for obrigatório, retorna NULL
        return null;
    }

    // Processamento numérico
    if ($isNumeric) {
        $cleaned = str_replace(['R$', ',', '.'], ['', '', '.'], $value);
        // Retorna o float, ou 0 se a conversão falhar
        return is_numeric($cleaned) ? (float) $cleaned : 0; 
    }
    
    // Sanitização de String
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
    // --------------------------------------------------------------------------------------
    // Colunas NOT NULL: NOME, CATEGORIA, PRECO_VENDA
    // Colunas NULL: DESCRICAO, ESTOQUE, PRECO_UNITARIO, MARGEM
    // --------------------------------------------------------------------------------------
    
    // CAMPOS OBRIGATÓRIOS (NOT NULL):
    $nome = getDbValue($data, 'nome', false, true); 
    $categoria = getDbValue($data, 'categoria', false, true); 
    $preco_venda = getDbValue($data, 'preco_venda', true, true); // Numérico e Obrigatório (Retorna 0 se vazio)
    
    // CAMPOS OPCIONAIS (NULL):
    $descricao = getDbValue($data, 'descricao');
    $estoque = getDbValue($data, 'quantidade', true); // Numérico e NULL
    $preco_uni = getDbValue($data, 'preco_unitario', true); // Numérico e NULL
    $margem = getDbValue($data, 'LUCRO_BRUTO', true); // Numérico e NULL

    // 2. Bind dos valores
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