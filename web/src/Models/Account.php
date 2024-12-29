<?php

namespace Models;

use Exception;

class Account
{
    private $username;
    private $email;

    private $db;

    public function __construct($db)
    {
        $this->db = $db;
    }

    /**
     * Create new user
     *
     * @param string $username
     * @param string $email
     * @param string $password_hash
     *
     * @return void
     */
    public function createUser(string $username, string $email, string $password_hash): void
    {
        $this->username = $username;
        $this->email = $email;

        $status = 'error';
        $message = '';
        try {
            $query = $this->db->prepare('INSERT INTO users (username, email, password_hash) VALUES (:username, :email, :password_hash)');
            $query->execute(['username' => $this->username, 'email' => $this->email, 'password_hash' => $password_hash]);
            $status = 'success';
            $message = 'User created successfully.';
        } catch (Exception $e) {
            $message = $e->getMessage();
        }

        echo json_encode([
            'status' => $status,
            'message' => $message
        ]);
    }
}
