<?php

namespace Controllers;

use Libraries\Controller;
use Models\Account;
use Models\User;

class AccountController extends Controller
{
    private $db;
    private $accountModel;

    public function __construct($db)
    {
        $this->db = $db;
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

    /**
     * Get session data for current user
     *
     * @return void
     */
    public function getCurrentUser(): void
    {
        $userModel = new User($this->db);
        $userData = (array) $userModel->getCurrentUserData();
        echo json_encode($userData);
    }

    /**
     * Add workout for current user
     *
     * @return void
     */
    public function addWorkout(): void
    {
        $form_data = (array) json_decode(file_get_contents('php://input'), TRUE);
        $workout_title = trim($form_data['workoutTitle']) ?? null;
        $movements_checked = trim($form_data['movementsChecked']) ?? null;
        $program_length_value = trim($form_data['programLengthValue']) ?? null;
        $description_value = trim($form_data['descriptionValue']) ?? null;
        var_dump("72");
        $userModel = new User($this->db);
        $response = (array) $userModel->addWorkout([$workout_title, $movements_checked, $program_length_value, $description_value]);
        echo json_encode($response);
    }
}
