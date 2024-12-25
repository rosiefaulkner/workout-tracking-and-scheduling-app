<?php

require "./vendor/autoload.php";
spl_autoload_register(function ($className) {
    require_once 'Libraries/' . $className . '.php';
});
new Controllers\UserController(1, 'boopsy', 'brian', 'salvador', 'bribri@gmail.com', '123322');

echo 'hello world';
