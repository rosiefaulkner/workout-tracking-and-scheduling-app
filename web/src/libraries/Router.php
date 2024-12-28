<?php

class Router {
    private $routes = [];

    public function add($method, $path, $handler) {
        $this->routes[] = compact('method', 'path', 'handler');
    }

    public function dispatch($requestMethod, $requestUri) {
        foreach ($this->routes as $route) {
            if ($requestMethod === $route['method']) {
                return call_user_func_array($route['handler'], array_slice(explode( '/', $requestUri ), 1));
            }
        }

        http_response_code(404);
        echo json_encode(['error' => 'Route not found']);
    }    
}
