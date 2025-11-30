<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../config/db.php';

$dados = json_decode(file_get_contents("php://input"), true);

$nome  = trim($dados["FUN_NOME"] ?? "");
$login = trim($dados["FUN_LOGIN"] ?? "");
$senha = $dados["FUN_SENHA"] ?? "";

if (!$nome || !$login || !$senha) {
    echo json_encode([
        "success" => false,
        "mensagem" => "Nome, login e senha são obrigatórios."
    ]);
    exit;
}

if (strlen($senha) < 6) {
    echo json_encode([
        "success" => false,
        "mensagem" => "A senha deve ter pelo menos 6 caracteres."
    ]);
    exit;
}

// Verifica se login já existe
$stmt = $pdo->prepare("SELECT FUN_ID FROM tb_funcionario WHERE FUN_LOGIN = ?");
$stmt->execute([$login]);

if ($stmt->fetch()) {
    echo json_encode([
        "success" => false,
        "mensagem" => "Esse login já está em uso. Escolha outro."
    ]);
    exit;
}

$senhaHash = password_hash($senha, PASSWORD_DEFAULT);

// Inserção
$stmt = $pdo->prepare("
    INSERT INTO tb_funcionario (FUN_NOME, FUN_LOGIN, FUN_SENHA, FUN_ATIVO)
    VALUES (?, ?, ?, 1)
");

if ($stmt->execute([$nome, $login, $senhaHash])) {
    echo json_encode([
        "success" => true,
        "mensagem" => "Usuário cadastrado com sucesso!"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "mensagem" => "Erro ao cadastrar usuário."
    ]);
}
