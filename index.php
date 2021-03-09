<?php

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

require_once __DIR__.'/vendor/autoload.php';

use app\Model\Application;
use app\Controller\SiteController;

$config = [
    'db' => [
        'dsn' => 'mysql:host=localhost;port=3306;dbname=teste',
        'user' => 'root',
        'password' => 'senha'
    ]
];

$app = new Application(__DIR__, $config);

$app->router->on('GET', '/', [SiteController::class, 'home']);
$app->router->on('GET', '/pacientes', [SiteController::class, 'listaHandler']);

$app->router->on('GET', '/deletar', [SiteController::class, 'deletarHandler']);

$app->router->on('GET', '/editar', [SiteController::class, 'editarHandler']);

$app->router->on('GET', '/cadastro', [SiteController::class, 'cadastro']);
$app->router->on('POST', '/cadastro', [SiteController::class, 'handleCadastro']);

$app->run();
?>