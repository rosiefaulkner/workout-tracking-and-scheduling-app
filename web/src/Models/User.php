<?php

namespace Models\User;

use DateTime;

class User
{
    private $user_id;
    private $first_name;
    private $last_name;
    private $email;
    private $password;
    private $workouts = [];
    private $schedule = [];

    /**
     * Initialize user values
     *
     * @param string|int $user_id
     * @param string $first_name
     * @param string $last_name
     * @param string $email
     * @param string $password
     *
     * @return void
     */
    public function __construct($user_id, $first_name, $last_name, $email, $password): void
    {
        $this->user_id = $user_id;
        $this->first_name = $first_name;
        $this->last_name = $last_name;
        $this->email = $email;
        $this->password = password_hash($password, PASSWORD_DEFAULT);
    }

    /**
     * Get user ID for current user
     *
     * @return string user_id
     */
    public function getId(): string
    {
        return $this->user_id;
    }

    /**
     * Get first name for current user
     *
     * @return string first name
     */
    public function getFirstName(): string
    {
        return $this->first_name;
    }

    /**
     * Get last name for current user
     *
     * @return string last name
     */
    public function getLastName(): string
    {
        return $this->last_name;
    }

    /**
     * Set first name for current user
     *
     * @param string $first_name
     *
     * @return void
     */
    public function setFirstName(string $first_name): void
    {
        $this->first_name = $first_name;
    }

    /**
     * Set last name for current user
     *
     * @param string $last_name
     *
     * @return void
     */
    public function setLastName(string $last_name): void
    {
        $this->last_name = $last_name;
    }

    /**
     * Get email for current user
     *
     * @return string user's email
     */
    public function getEmail(): string
    {
        return $this->email;
    }

    /**
     * Set email for current user
     *
     * @param string $email
     *
     * @return void
     */
    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    /**
     * Verify password
     *
     * @param string $password
     *
     * @return bool returns TRUE if the password
     * and hash match, or FALSE otherwise 
     */
    public function checkPassword(string $password): bool
    {
        return password_verify($password, $this->password);
    }

    /**
     * Add a workout to the user's workout list
     *
     * @param array $workout
     *
     * @return void
     */
    public function addWorkout(array $workout): void
    {
        $this->workouts[] = $workout;
    }

    /**
     * Get all workouts for the user
     *
     * @return array all workouts assigned to user
     */
    public function getWorkouts(): array
    {
        return $this->workouts;
    }

    /**
     * Schedule a workout for the user. Use the current
     * date and time if no date is provided
     *
     * @param array $workout
     * @param DateTime $date
     *
     * @return void
     */
    public function addToSchedule(array $workout, DateTime $date = null): void
    {
        if ($date === null) {
            $date = date('Y-m-d H:i:s'); // Use the current date and time if no date is provided
        }
        $this->schedule[$date] = $workout;
    }

    /**
     * Get the user's workout schedule
     *
     * @return array
     */
    public function getSchedule(): array
    {
        return $this->schedule;
    }
}
