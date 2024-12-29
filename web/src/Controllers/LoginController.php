<?php

namespace Controllers;

use Libraries\Controller;
use Models\User;

class LoginController extends Controller
{
    private $user;

    private $userModel;

    public function __construct($db) {
        $this->userModel = new User($db);
    }


    /**
     * Initialize user after login
     *
     * @return void
     */
    public function index() {
        // TODO: Instead, instantiate user model from successful log in attempt
        $this->login();
    }

    /**
     * Initialize session for logged in user
     *
     * @return void
     */
    public function login()
    {
        $form_data = (array) json_decode(file_get_contents('php://input'), TRUE);

        $data = [
        'email' => trim($form_data['email']) ?: null,
        'password' => trim($form_data['password']) ?: null,     
        ];

        if (empty($data['email']) || empty($data['password'])) {
            echo json_encode([
                'status' => 'error',
                'message' => 'Missing credentials'
            ]);
            return;
        }
  
        // Check email exists
        if (!$this->userModel->getUserByEmail($data['email'])) {
            echo json_encode([
                'status' => 'error',
                'message' => 'Email not found'
            ]);
            return;
        }
  
        // Verify password matches user by email
        $loggedInUser = $this->userModel->verifyPassword($data['email'], $data['password']);

        if ($loggedInUser) {
            $this->createUserSession($loggedInUser);
            echo json_encode(array_merge($loggedInUser, ['status' => 'success', 'message' => 'User logged in']));
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'Password incorrect'
            ]);
        }
      }
  
      public function createUserSession($user)
      {
        $_SESSION['user_id'] = $user['user_id'] ?: null;
        $_SESSION['email'] = $user['email'] ?: null;
        $_SESSION['username'] = $user['username'] ?: null;
      }
  
      public function logout()
      {
        unset($_SESSION['user_id']);
        unset($_SESSION['user_email']);
        unset($_SESSION['user_name']);
        session_destroy();
      }

}
