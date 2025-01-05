<?php

namespace Models;

use Exception;
use Models\User;

class Workout
{
    private $workout;
    private $movements;

    private $db;

    public function __construct($db)
    {
        $this->db = $db;
    }

    /**
     * Get movement ID by name
     *
     * @param string $movement_name
     *
     * @return int|null movement ID or null if not found
     */
    public function getMovementIDByName(string $movement_name): ?int
    {
        $movement_name_pdo_quoted = $this->db->quote($movement_name);
        $stmt = $this->db->query(sprintf('SELECT *
        FROM movements
        WHERE name LIKE %s
        ', $movement_name_pdo_quoted));

        $row = $stmt->fetch(\PDO::FETCH_ASSOC);

        if ((int) $row['movement_id'] > 0) {
            return (int) $row['movement_id'];
        }

        return null;
    }

    /**
     * Get all movements
     *
     * @return array
     */
    public function getAllMovements(): array
    {
        $stmt = $this->db->query('SELECT *
        FROM movements
        ');

        try {
            $row = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            if (!empty($row)) {
                $resp = [
                    'status' => 'success',
                    'exercises' => $row
                ];
            } else {
                $resp = [
                    'status' => 'error',
                    'message' => 'Failed to fetch movements'
                ];
            }
        } catch (\PDOException $e) {
            // Handle exceptions, e.g., log the error or rethrow it
            error_log('Database error: ' . $e->getMessage());
            return [];
        }
        return $resp;
    }

    /**
     * For a given workout, add movements to workouts_movements table
     * else, return error response.
     *
     * @param int $workout_id
     * @param array $movements_sets_reps
     * ex: [{"id": 1, "name": "3/4 Sit-Up", "sets": "3", "reps": "8" }]
     *
     * @return array
     */
    public function addWorkoutMovements(int $workout_id, array $movements_sets_reps): array
    {
        foreach ($movements_sets_reps as $movement) {
            $movement_id = $this->getMovementIDByName($movement['name']);
            try {
                $sql = 'INSERT INTO workouts_movements (workout_id, movement_id)
                VALUES (:workout_id, :movement_id)';
                
                $stmt = $this->db->prepare($sql);
    
                $stmt->bindParam(':movement_id', $movement_id, \PDO::PARAM_INT);
                $stmt->bindParam(':workout_id', $workout_id, \PDO::PARAM_INT);
    
                $stmt->execute();
    
                $resp = [
                    'status' => 'success',
                    'message' => 'Workout movements added',
                ];
            } catch (\PDOException $e) {
                $resp = [
                    'status' => 'error',
                    'message' => $e->getMessage(),
                    'stack_trace' => $e->getTraceAsString(),
                ];
            }
        }
        return $resp;
    }
}
