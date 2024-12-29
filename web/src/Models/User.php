<?php

namespace Models;

use Database;

class User
{
    private $user_id;
    private $first_name;
    private $last_name;
    private $email;
    private $password;
    private $workouts = [];
    private $schedule = [];

    private $db;

    public function __construct($db)
    {
        $this->db = $db;
    }

    /**
     * Instantiate user
     *
     * @param array $user_details
     *
     * @return void
     */
    public function instantiateUser(array $user_details = []): void
    {
        if (empty($user_details)) {
            return;
        }
        [$user_id, $first_name, $last_name, $email, $workouts, $schedule] = $user_details;
        $this->user_id = $user_id;
        $this->first_name = $first_name;
        $this->last_name = $last_name;
        $this->email = $email;
        $this->workouts = $workouts;
        $this->schedule = $schedule;
    }

    /**
     * Get all users
     *
     * @return void
     */
    public function getAllUsers()
    {
        $stmt = $this->db->query("SELECT * FROM users");
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    /**
     * Get User by ID
     *
     * @param string $user_id
     *
     * @return array user details
     */
    public function getUserByID(string $user_id): array
    {
        $stmt = $this->db->query(sprintf('SELECT *
        FROM users
        WHERE user_id = %s
        LIMIT 1
        ', $user_id));

        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    /**
     * Find user by email 
     *
     * @param string $email
     *
     * @return array user details
     */
    public function getUserByEmail(string $email): array
    {
        $email_pdo_quoted = $this->db->quote($email);
        $stmt = $this->db->query(sprintf('SELECT *
        FROM users
        WHERE email = %s
        ', $email_pdo_quoted));

        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    /**
     * Verify password during log in attempt
     *
     * @param string $email
     * @param string $password
     *
     * @return bool|array false if login not successful,
     * otherwise returns array of user details
     */
    public function verifyPassword($email, $password): bool|array
    {
        $successful = false;
        $row = $this->getUserByEmail($email);

        if (empty($row)) {
            return false;
        }

        $hashed_password = $row['password_hash'];
        if (password_verify($password, $hashed_password)) {
            $successful = !empty($row) ? $row : $successful;
        } else {
            $successful = false;
        }

        return $successful;
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
     * @param string|null $date
     *
     * @return void
     */
    public function addToSchedule(array $workout, ?string $date): void
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
