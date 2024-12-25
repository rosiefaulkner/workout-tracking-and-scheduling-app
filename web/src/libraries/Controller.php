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
        require_once '../src/Models/' . $model . '.php';

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
        if (file_exists('../app/views/' . $view . '.php')) {
            require_once '../app/views/' . $view . '.php';
        } else {
            // View does not exist
            die('View does not exist');
        }
    }
}
