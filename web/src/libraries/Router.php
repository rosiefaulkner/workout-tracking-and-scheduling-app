<?php

class Router {

    private $routes = [];

    /**
     * Create array of API endpoint
     *
     * @param string $method
     * @param string $path
     * @param string $handler
     *
     * @return void
     */
    public function add($method, $path, $handler): void
    {
        $this->routes[] = compact('method', 'path', 'handler');
    }

    /**
     * Dispatch API routes
     *
     * @param string request method ex. GET, POST, etc.
     * @param string request URI
     *
     * @return mixed callback for controller endpoint method, false if error
     */
    public function dispatch($requestMethod, $requestUri): mixed
    {
        foreach ($this->routes as $route) {
            if ($requestMethod === $route['method']) {
                $path = call_user_func_array($route['handler'], array_slice(explode( '/', $requestUri['path'] ), 1));
                $this->routes = [];
                return $path;
            }
        }

        http_response_code(404);
        echo json_encode(['error' => 'Route not found']);
    }    
}
