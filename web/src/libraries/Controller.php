<?php

namespace Libraries;

class Controller
{
    /**
     * Instantiate model
     *
     * @param [type] $model
     */
    public function model($model)
    {
        // Require model file
        require_once 'Models\\' . $model . '.php';

        // Instatiate model
        return new $model();
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
