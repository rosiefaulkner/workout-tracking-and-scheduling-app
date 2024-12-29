<?php

/*
   * PDO Database Class
   * Connect to database
   * Create prepared statements
   * Bind values
   * Return rows and results
   */
class Database
{
  private static $host = 'db';
  private static $user = 'workout_user';
  private static $pass = 'workout-app';
  private static $dbname = 'workout_app';

  private $dbh;
  private $stmt;
  private $error;

  private static $instance = null;

//   public function __construct()
//   {
//     // Set DSN
//     $dsn = 'mysql:host=' . $this->host . ';dbname=' . $this->dbname;
//     $options = array(
//       PDO::ATTR_PERSISTENT => true,
//       PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
//     );

    // Create PDO instance
//     try {
//       $this->dbh = new PDO($dsn, $this->user, $this->pass, $options);
//     } catch (PDOException $e) {
//       $this->error = $e->getMessage();
//       echo $this->error;
//     }
//   }

  public static function getInstance()
  {
    if (self::$instance === null) {
      $dsn = 'mysql:host=' . self::$host . ';dbname=' . self::$dbname;
      self::$instance = new PDO($dsn, self::$user, self::$pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
      ]);
    }
    return self::$instance;
  }

  /**
   * Prepare statement with query
   *
   * @param string $sql
   *
   * @return void
   */
  public function query(string $sql): void
  {
    $this->stmt = $this->dbh->prepare($sql);
  }

  /**
   * PDO Quote
   *
   * @param string $val
   *
   * @return string PDO quoted value
   */
  public function quote(string $val): string
  {
    return $this->dbh->quote($val);
  }

  /**
   * Bind values
   *
   * @param string $param
   * @param string|int $value
   * @param int|bool|null $type
   *
   * @return void
   */
  public function bind(string $param, string|int $value, $type = null): void
  {
    if (is_null($type)) {
      switch (true) {
        case is_int($value):
          $type = PDO::PARAM_INT;
          break;
        case is_bool($value):
          $type = PDO::PARAM_BOOL;
          break;
        case is_null($value):
          $type = PDO::PARAM_NULL;
          break;
        default:
          $type = PDO::PARAM_STR;
      }
    }

    $this->stmt->bindValue($param, $value, $type);
  }

  /**
   * Execute the prepared statement
   *
   * @return mixed
   */
  public function execute(): mixed
  {
    return $this->stmt->execute();
  }

  /**
   * Get result set as array of objects
   *
   * @return array
   */
  public function resultSet(): array
  {
    $this->execute();
    return $this->stmt->fetchAll(PDO::FETCH_OBJ);
  }
  

  /**
   * Get single record as object
   *
   * @return mixed
   */
  public function single(): mixed
  {
    $this->execute();
    return $this->stmt->fetch(PDO::FETCH_OBJ);
  }

  /**
   * Get row count
   *
   * @return int
   */
  public function rowCount(): int
  {
    return $this->stmt->rowCount();
  }
}
