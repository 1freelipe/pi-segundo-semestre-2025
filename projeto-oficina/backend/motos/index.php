<?php 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Content-type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../config/db.php';

if($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

try {
    $stmt = $pdo->prepare('SELECT MOTO_ID, MODELO_NOME, MOTO_ANO, MARCA_NOME, CLI_NOME, CLI_CPF, MOTO_PLACA, COR_NOME, MOTO_ATIVO, MOTO_OBSERVACAO FROM tb_moto
    INNER JOIN tb_modelo ON tb_moto.MOTO_MODELO = tb_modelo.MODELO_ID
    INNER JOIN tb_marca ON tb_moto.MOTO_MARCA = tb_marca.MARCA_ID
    INNER JOIN tb_cliente ON tb_moto.MOTO_CLIENTE = tb_cliente.CLI_ID
    INNER JOIN tb_cor ON tb_moto.MOTO_COR = tb_cor.COR_ID
    ORDER BY MOTO_ID DESC');

    $stmt->execute();
    $motos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if($motos) {
        http_response_code(200);
        echo json_encode(['success' => true, 'motos' => $motos]);
    } else {
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'Nenhuma moto encontrada.']);
    }
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erro ao se conectar com o servidor.' . $e->getMessage()]);
}


?>