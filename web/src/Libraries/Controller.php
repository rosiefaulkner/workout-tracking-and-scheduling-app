<?php

namespace Libraries;

class Controller
{
    /**
     * Instantiate model
     *
     * @param string $model
     */
    public function model(string $model)
    {
        // Require model file
        require_once 'Models\\' . $model . '.php';

        // Instatiate model
        return new $model();
    }

    /**
     * Redirect helper function
     *
     * @param string $page
     *
     * @return void
     */
    public function redirect(string $page)
    {
        $url_root = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/';
        header('location: ' . $url_root . '/' . $page);
    }

    /**
     * Load view
     *
     * @param mixed $view
     * @param array $data
     */
    public function view($view, $data = []): void
    {
        // Check for view file
        if (file_exists('../../public/index.html')) {
            require_once '../../public/index.html';
        } else {
            // View does not exist
            die('View does not exist');
        }
    }
}
