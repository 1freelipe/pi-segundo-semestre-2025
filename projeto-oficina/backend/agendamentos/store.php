<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Content-type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../config/db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!empty($data['cliente']) || !empty($data['placa']) || !empty($data['funcionario'])) {

    // Captura de cliente
    $cliente = $data['cliente'];
    $stmt_cliente = $pdo->prepare('SELECT CLI_ID FROM tb_cliente WHERE CLI_CPF = ?');
    $stmt_cliente->execute([$cliente]);
    $cliente_id = $stmt_cliente->fetch();

    if (!$cliente_id) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Cliente não encontrado.']);
        exit;
    }

    $id_cliente = $cliente_id['CLI_ID'];

    // Captura de motos
    $moto = $data['placa'];
    $stmt_moto = $pdo->prepare('SELECT MOTO_ID FROM tb_moto WHERE MOTO_PLACA = ? AND MOTO_CLIENTE = ?');
    $stmt_moto->execute([$moto, $id_cliente]);
    $moto_id = $stmt_moto->fetch();

    if (!$moto_id) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Essa moto não pertence a esse cliente']);
        exit;
    }

    $id_moto = $moto_id['MOTO_ID'];

    // Captura de funcionario
    $funcionario = $data['funcionario'];
    $stmt_funcionario = $pdo->prepare('SELECT FUN_ID FROM tb_funcionario WHERE FUN_NOME = ?');
    $stmt_funcionario->execute([$funcionario]);
    $funcionario_id = $stmt_funcionario->fetch();

    if(!$funcionario_id) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Mecânico não encontrado ou não cadastrado.']);
    }

    $id_funcionario = $funcionario_id['FUN_ID'];


    try {
        $stmt = $pdo->prepare('INSERT INTO tb_agendamento_de_servico (AGEN_MOTO, AGEN_CLIENTE, AGEN_FUNCIONARIO, AGEN_DATA, AGEN_HORA, AGEN_MOTIVO_OBSERVACAO) VALUES (:moto, :cliente, :funcionario, :data_agen, :hora, :observacao_motivo)');

        $data_agendamento = htmlspecialchars(strip_tags($data['data_agen'] ?? null));
        $hora = htmlspecialchars(strip_tags($data['hora'] ?? ''));
        $observacao = htmlspecialchars(strip_tags($data['observacao'] ?? ''));
        
        $stmt->bindParam(':moto', $id_moto);
        $stmt->bindParam(':cliente', $id_cliente);
        $stmt->bindParam(':funcionario', $id_funcionario);
        $stmt->bindParam(':data_agen', $data_agendamento);
        $stmt->bindParam(':hora', $hora);
        $stmt->bindParam(':observacao_motivo', $observacao);

        if($stmt->execute()) {
            http_response_code(200);
            echo json_encode(['success' => true, 'message' => 'Agendamento criado com sucesso.']);
        } else {
            http_response_code(200);
            $errorInfo = $stmt->errorInfo();
            echo json_encode(['success' => true, 'message' => 'Não foi possível concluir o agendamento.', 'error' => $errorInfo[2]]);
        }
    } catch(PDOException $e) {
        if($e->getCode() === '23000') {
            
            $errorMessage = $e->getMessage();

            if(strpos($errorMessage, 'AGEN_MOTO') !== false) {
                http_response_code(409);
                echo json_encode(['success' => false, 'message' => 'Essa moto já possui um agendamento ativo.', 'MOTO' => $id_moto]);
            } else {
                http_response_code(409);
                echo json_encode(['success' => false, 'message' => 'Ocorreu um erro de duplicidade de dados.' . $errorMessage]);
            }
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Ocorreu um erro ao se conectar com o servidor.' . $e->getMessage()]);
        }
    }
}
