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
 * Garante que campos vazios virem NULL (se permitido) ou 0/'' (se obrigatório).
 * * @param array $data O array de dados do input.
 * @param string $key A chave do dado.
 * @param bool $isNumeric Se o campo é numérico (INT/DECIMAL).
 * @param bool $isMandatory Se o campo é obrigatório (NOT NULL no DB).
 * @return mixed O valor sanitizado, NULL, 0, ou ''.
 */
function getDbValue($data, $key, $isNumeric = false, $isMandatory = false) {
    $value = $data[$key] ?? null; 
    
    // Se o valor for null ou string vazia
    if ($value === null || $value === '') {
        // Se for numérico OBRIGATÓRIO, retorna 0 (para NOT NULL)
        if ($isNumeric && $isMandatory) {
            return 0; 
        }
        // Se for string OBRIGATÓRIA, retorna '' (para NOT NULL)
        if (!$isNumeric && $isMandatory) {
            return '';
        }
        // Se não for obrigatório, retorna NULL
        return null;
    }

    // Processamento numérico
    if ($isNumeric) {
        // Remove caracteres de moeda e tenta converter para float.
        $cleaned = str_replace(['R$', ',', '.'], ['', '', '.'], $value);
        return is_numeric($cleaned) ? (float) $cleaned : 0; 
    }
    
    // Sanitização de String
    return htmlspecialchars(strip_tags($value));
}

try {
    // 1. Obtenção dos valores prontos para o DB
    // NOT NULL (Obrigatórios): NOME, CATEGORIA, PRECO_VENDA
    // NULL (Opcionais): DESCRICAO, ESTOQUE, PRECO_UNITARIO, MARGEM
    // --------------------------------------------------------------------------------------
    
    // CAMPOS OBRIGATÓRIOS (NOT NULL):
    // Usamos $isMandatory = true. O getDbValue retornará 0 ou '' se vazio.
    $nome = getDbValue($data, 'nome', false, true); 
    $categoria = getDbValue($data, 'categoria', false, true); 
    $preco_venda = getDbValue($data, 'preco_venda', true, true); 
    
    // CAMPOS OPCIONAIS (NULL):
    // Usamos $isMandatory = false. O getDbValue retornará NULL se vazio.
    $descricao = getDbValue($data, 'descricao', false, false);
    $estoque = getDbValue($data, 'quantidade', true, false); 
    $preco_uni = getDbValue($data, 'preco_unitario', true, false); 
    $margem = getDbValue($data, 'LUCRO_BRUTO', true, false); 

    // 💡 VALIDAÇÃO ADICIONAL DE BARREIRA (Se o frontend falhar no required):
    if ($nome === '' || $categoria === '' || $preco_venda === 0) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "O nome, categoria e preço de venda são campos obrigatórios."]);
        exit;
    }


    $sql = "INSERT INTO tb_pecas_servico
        (PECAS_SER_NOME, PECAS_SER_CATEGORIA, PECAS_SER_DESCRICAO, PECAS_SER_ESTOQUE, 
         PECAS_SER_PRECO_UNITARIO, PECAS_SER_PRECO_VENDA, PECAS_SER_MARGEM)
        VALUES (:nome, :categoria, :descricao, :estoque, :preco_uni, :preco_venda, :margem)
    ";

    $stmt = $pdo->prepare($sql);

    // 2. Bind dos valores (PDO fará o cast correto de NULL ou número/string)
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