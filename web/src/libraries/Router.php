<?php

class Router {
    private $routes = [];

    public function add($method, $path, $handler) {
        $this->routes[] = compact('method', 'path', 'handler');
    }

    public function dispatch() {
        $requestMethod = $_SERVER['REQUEST_METHOD'];
        $requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    
        foreach ($this->routes as $route) {
            if ($requestMethod === $route['method'] && preg_match("~^{$route['path']}$~", $requestUri, $matches)) {
                return call_user_func_array($route['handler'], array_slice($matches, 1));
            }
        }
    
        // Debugging: Log the request URI and registered routes
        error_log("Requested URI: " . $requestUri);
        error_log("Available Routes: " . json_encode($this->routes));
    
        http_response_code(404);
        echo json_encode(['error' => 'Route not found']);
    }    
}
