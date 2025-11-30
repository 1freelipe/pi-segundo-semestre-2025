<?php

header("Access-Control-Allow-Origin: *");
header("Content-type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS, PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../config/db.php';

$data = json_decode(file_get_contents("php://input"), true);

if(empty($data['CLI_ID']) || empty($data['CLI_NOME']) || empty($data['CLI_CPF'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Dados incompletos."]);
    exit;
}

try {
    $sql = "UPDATE tb_cliente
    SET CLI_NOME = :nome,
    CLI_CPF = :cpf,
    CLI_TELEFONE = :telefone,
    CLI_ENDERECO = :endereco,
    CLI_CEP = :cep,
    CLI_BAIRRO = :bairro,
    CLI_NUMERO = :numero,
    CLI_EMAIL = :email,
    CLI_OBSERVACAO = :obs,
    CLI_ATIVO = :ativo
    WHERE CLI_ID = :id";

    $stmt = $pdo->prepare($sql);

    $stmt->bindValue(':nome', htmlspecialchars(strip_tags($data['CLI_NOME'] ?? '')));
    $stmt->bindValue(':cpf', htmlspecialchars(strip_tags($data['CLI_CPF'] ?? '')));
    $stmt->bindValue(':telefone', htmlspecialchars(strip_tags($data['CLI_TELEFONE'] ?? '')));
    $stmt->bindValue(':endereco', htmlspecialchars(strip_tags($data['CLI_ENDERECO'] ?? '')));
    $stmt->bindValue(':cep', htmlspecialchars(strip_tags($data['CLI_CEP'] ?? '')));
    $stmt->bindValue(':bairro', htmlspecialchars(strip_tags($data['CLI_BAIRRO'] ?? '')));
    $stmt->bindValue(':numero', htmlspecialchars(strip_tags($data['CLI_NUMERO'] ?? '')));
    $stmt->bindValue(':email', htmlspecialchars(strip_tags($data['CLI_EMAIL'] ?? '')));
    $stmt->bindValue(':obs', htmlspecialchars(strip_tags($data['CLI_OBSERVACAO'] ?? '')));
    $stmt->bindValue(':ativo', $data['CLI_ATIVO'], PDO::PARAM_INT);

    $stmt->bindValue(':id', $data['CLI_ID'], PDO::PARAM_INT);

    if($stmt->execute()) {
        http_response_code(200);
        echo json_encode(["success" => true, "message" => "Cliente atualizado com sucesso."]);
    } else {
        http_response_code(503); // service unavaliable
        echo json_encode(["success" => false, "message" => "Não foi possível atualizar o cliente."]);
    }
} catch(PDOException $e) {
    if($e->getCode() === '23000') {
        http_response_code(409); // Conflict
        if(strpos($e->getMessage(), 'CLI_EMAIL_UNIQUE') !== false) {
            echo json_encode(["success" => false, "message" => "Esse e-mail já está sendo utilizado."]);
        } else if(strpos($e->getMessage(), 'CLI_CPF_UNIQUE') !== false) {
            echo json_encode(["success" => false, "message" => "Esse CPF já foi cadastrado"]);
        } else {
            echo json_encode(["success" => false, "message" => "Erro de duplicidade."]);
        }
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Erro ao se conectar com o servidor: " . $e->getMessage()]);
    }
}


?>