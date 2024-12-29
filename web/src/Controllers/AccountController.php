<?php

namespace Controllers;

use Libraries\Controller;
use Models\Account;

class AccountController extends Controller
{
    private $accountModel;

    public function __construct($db)
    {
        $this->accountModel = new Account($db);
    }

    public function index()
    {
        echo filter_input(INPUT_GET, 'link', FILTER_SANITIZE_URL);
    }

    /**
     * Create a new user
     *
     * @return void
     */
    public function createUser()
    {
        $form_data = (array) json_decode(file_get_contents('php://input'), TRUE);
        $username = trim($form_data['username']) ?? null;
        $email = trim($form_data['email']) ?? null;
        $password_hash = password_hash(trim($form_data['password']), PASSWORD_DEFAULT);

        if (!$username || !$email) {
            http_response_code(400);
            echo json_encode([
                'status' => 'error',
                'message' => 'Name and email are required'
            ]);
            return;
        }
        $this->accountModel->createUser($username, $email, $password_hash);
    }
}
