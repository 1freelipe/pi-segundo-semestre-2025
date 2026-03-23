<?php
$allowedOrigins = [
    'http://localhost:3000',
    'https://black-meadow-0fc40280f.3.azurestaticapps.net',
    'https://www.mainteer.com.br'
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
}

header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

$isAzureEnvironment = getenv('WEBSITE_SITE_NAME');

if ($isAzureEnvironment) {
    // Ambiente de produção (Azure + Railway)
    $host     = getenv('DB_HOST');
    $db_name  = getenv('DB_NAME');
    $username = getenv('DB_USER');
    $password = getenv('DB_PASS');
    $port     = getenv('DB_PORT');
    
    $dsn = "mysql:host=$host;port=$port;dbname=$db_name;charset=utf8";

} else {
    // Ambiente local (localhost + mysql)
    $host     = 'localhost';
    $db_name  = 'mainteer';
    $username = 'root';
    $password = '';
    
    $dsn = "mysql:host=$host;dbname=$db_name;charset=utf8";
}

try {
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch(PDOException $e) {
    die('Erro ao conectar com o banco de dados: ' . $e->getMessage());
}

?>