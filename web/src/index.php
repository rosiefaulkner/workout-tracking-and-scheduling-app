<?php

// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
// header("Access-Control-Allow-Headers: Content-Type, Authorization");

// require "./vendor/autoload.php";

// require './Libraries/Router.php';
// require './Libraries/Database.php';


// header('Content-Type: application/json');

// $db = Database::getInstance();
// $router = new Router();

// $router->add('GET', '/', [new Controllers\UserController($db), 'index']);
// $router->add('GET', '/users', [new Controllers\UserController($db), 'index']);
// $router->add('GET', '/account', [new Controllers\AccountController($db), 'index']);

// $router->dispatch();

// Enable CORS
require "./vendor/autoload.php";
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Load necessary files (e.g., autoloaders, router, controllers)
require_once './Libraries/Router.php';
require_once './Libraries/Database.php';
require_once './Controllers/UserController.php';

// Setup database connection
$db = Database::getInstance();

// Initialize router
$router = new Router();

// Define Routes
$router->add('GET', '/', [new Controllers\UserController($db), 'index']);
$router->add('GET', '/account', [new Controllers\AccountController($db), 'index']);

// API response
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$router->dispatch($_SERVER['REQUEST_METHOD'], $requestUri);


