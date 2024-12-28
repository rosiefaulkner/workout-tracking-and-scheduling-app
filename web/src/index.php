<?php

require "./vendor/autoload.php";

require './Libraries/Router.php';
require './Libraries/Database.php';


header('Content-Type: application/json');

$db = Database::getInstance();
$router = new Router();

$router->add('GET', '/', [new Controllers\LoginController(), 'index']);
$router->add('GET', '/users', [new Controllers\UserController($db), 'index']);
$router->add('GET', '/account', [new Controllers\AccountController($db), 'index']);

$router->dispatch();

