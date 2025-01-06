<?php

namespace Controllers;

use Libraries\Controller;
use Models\Account;
use Models\User;
use Models\Workout;

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
    public function createWorkout(): void
    {
        $form_data = (array) json_decode(file_get_contents('php://input'), TRUE);
        $workout_title = trim($form_data['workoutTitle']) ?: null;
        $movements_checked = is_array($form_data['movementsChecked']) && !empty($form_data['movementsChecked']) ? $form_data['movementsChecked'] : [];
        $program_length_value = $form_data['programLengthValue'] ? (int) $form_data['programLengthValue'] : 1;
        $description_value = trim($form_data['descriptionValue']) ?: null;
        $visibility = (bool) $form_data['visibility'];
        $email = $form_data['userEmail'];
        $user_id = $form_data['userID'];
        $workout = compact('user_id', 'email', 'workout_title', 'movements_checked', 'program_length_value', 'description_value', 'visibility');
        $userModel = new User($this->db);
        $create_workout_response = (array) $userModel->createWorkout($workout);
        $workout_id = $create_workout_response['workout_id'];
        // Add workout to workouts_movements table
        $movements_sets_reps = $form_data['movementsSetsReps'];
        $workout_model = new Workout($this->db);
        $response = '';
        if (!empty($create_workout_response)) {
            $add_movements_to_workout_response = (array) $workout_model->addWorkoutMovements($workout_id, $movements_sets_reps);
            $response = array_merge($create_workout_response, $add_movements_to_workout_response);
        }
        echo json_encode($response);
    }

    public function getMovements(): void
    {
        $workout_model = new Workout($this->db);
        $movements_response = $workout_model->getAllMovements();
        echo json_encode($movements_response);
    }
}
