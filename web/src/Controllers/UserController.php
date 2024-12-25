<?php

namespace Controllers\User;

use Controller;
use Models\User\User;
use DateTime;

class UserController extends Controller
{
    private $user;

    /**
     * Constructor to initialize User model
     *
     * @param string|int $user_id
     * @param string $first_name
     * @param string $last_name
     * @param string $email
     * @param string $password
     */
    public function __construct($user_id, $first_name, $last_name, $email, $password)
    {
        $this->user = new User($user_id, $first_name, $last_name, $email, $password);
    }

    /**
     * Create a new user
     *
     * @param string $first_name
     * @param string $last_name
     * @param string $email
     * @param string $password
     *
     * @return string response
     */
    public function createUser(string $first_name, string $last_name, string $email, string $password): string
    {
        $this->user = new User(uniqid(), $first_name, $last_name, $email, $password);
        return json_encode([
            'status' => 'success',
            'first_name' => $this->user->getFirstName(),
            'last_name' => $this->user->getLastName()
        ]);
    }

    /**
     * Update user's first name
     *
     * @param string $first_name
     *
     * @return string response
     */
    public function updateFirstName(string $first_name): string
    {
        $this->user->setFirstName($first_name);
        return json_encode([
            'status' => 'success',
            'first_name' => $this->user->getFirstName()
        ]);
    }

    /**
     * Update user's last name
     *
     * @param string $last_name
     *
     * @return string response
     */
    public function updateLastName(string $last_name): string
    {
        $this->user->setLastName($last_name);
        return json_encode([
            'status' => 'success',
            'last_name' => $this->user->getLastName()
        ]);
    }

    /**
     * Update user's email
     *
     * @param string $emai
     *
     * @return string response
     */
    public function updateEmail(string $email): string
    {
        $this->user->setEmail($email);
        return json_encode([
            'status' => 'success',
            'email' => $this->user->getEmail()
        ]);
    }

    /**
     * Add a workout to the user's workout list
     *
     * @param array $workout
     *
     * @return string response
     */
    public function addWorkoutToUser(array $workout): string
    {
        $this->user->addWorkout($workout);
        return json_encode([
            'status' => 'success',
        ]);
    }

    /**
     * Get all workouts for the user
     *
     * @return array all workouts assigned to the user
     */
    public function getUserWorkouts(): array
    {
        return $this->user->getWorkouts();
    }

    /**
     * Schedule a workout for the user
     *
     * @param array $workout
     * @param DateTime|null $date
     *
     * @return string response
     */
    public function scheduleWorkout(array $workout, DateTime $date = null): string
    {
        $this->user->addToSchedule($workout, $date);
        return json_encode([
            'status' => 'success',
        ]);
    }

    /**
     * Get the user's workout schedule
     *
     * @return array user's workout schedule
     */
    public function getUserSchedule(): array
    {
        return $this->user->getSchedule();
    }
}
