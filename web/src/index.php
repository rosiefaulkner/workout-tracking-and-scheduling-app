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

$controllers = ['account', 'user', 'login', 'workout', 'movement'];
// Setup database connection
$db = Database::getInstance();

// Initialize router
$router = new Router();

// Extract the path from the URL (e.g., "/api/example-path")
$parsedUrl = parse_url($_SERVER['REQUEST_URI']);
$path = trim($parsedUrl['path'], '/');

// Find the segment containing dashes
$segments = explode('/', $path);
$endpoint = null;

foreach ($segments as $segment) {
    if (strpos($segment, '-') !== false) {
        $endpoint = strtolower(str_replace('-', '', $segment));
        break;
    }
}

// Request is made to valid controller with valid endpoint
$valid_request = count(array_intersect($segments, $controllers)) > 0;
$requestMethod = $_SERVER["REQUEST_METHOD"] ?: 'GET';

if ($valid_request) {
    if ($endpoint) {
        $router->add($requestMethod, $path, [new Controllers\AccountController($db), $endpoint]);
    } else {
        $router->add($requestMethod, $path, [new Controllers\LoginController($db), 'login']);
    }
} else {
    $router->add($requestMethod, '/', [new Controllers\LoginController($db), 'index']);
}

// $router->add('GET', '/api/account', [new Controllers\AccountController($db), 'index']);
// $router->add('GET', '/api/user', [new Controllers\UserController($db), 'index']);
// $router->add('POST', '/api/user/createUser', [new Controllers\UserController($db), 'createUser']);
// $router->add('GET', '/api/account', [new Controllers\AccountController($db), 'index']);

// API response
$router->dispatch($_SERVER['REQUEST_METHOD'], $parsedUrl);


