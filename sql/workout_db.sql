--Clean up local
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `equipment`;
DROP TABLE IF EXISTS `movements`;
DROP TABLE IF EXISTS `workouts`;
DROP TABLE IF EXISTS `workouts_movements`;
DROP TABLE IF EXISTS `users_workouts`;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,  
    email VARCHAR(100) NOT NULL UNIQUE,   
    password_hash VARCHAR(255) NOT NULL,  
    first_name VARCHAR(50),             
    last_name VARCHAR(50),              
    date_of_birth DATE,                   
    gender ENUM('male', 'female', 'other'),
    height_in DECIMAL(5, 2),              
    weight_lb DECIMAL(5, 2),          
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    INDEX (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE equipment (
    equipment_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,                 
    description TEXT,                           
    category VARCHAR(50),                       
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX (equipment_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE workouts (
    workout_id INT AUTO_INCREMENT PRIMARY KEY,
    workout_title VARCHAR(255) NOT NULL,
    workout_type VARCHAR(50) DEFAULT NULL,      
    duration_minutes INT DEFAULT NULL,             
    intensity ENUM('low', 'medium', 'high') DEFAULT NULL,
    created_by_user_id INT DEFAULT NULL,       
    description TEXT,
    visibility TINYINT(1) NOT NULL DEFAULT 1,                        
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    INDEX (workout_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE movements (
  movement_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) DEFAULT NULL,
  aliases VARCHAR(255) DEFAULT NULL,
  primary_muscles VARCHAR(255) DEFAULT NULL,
  secondary_muscles VARCHAR(255) DEFAULT NULL,
  focus ENUM('pull', 'push', 'static'),
  level ENUM('beginner', 'intermediate', 'expert'),
  mechanic ENUM('compound', 'isolation'),
  equipment ENUM('body only', 'machine', 'other', 'foam roll', 'kettlebells', 'dumbbell', 'cable', 'barbell', 'bands', 'medicine ball', 'exercise ball', 'e-z curl bar') DEFAULT NULL,
  category ENUM('strength', 'stretching', 'plyometrics', 'strongman', 'powerlifting', 'cardio', 'olympic weightlifting'),
  instructions TEXT DEFAULT NULL,
  description VARCHAR(255) DEFAULT NULL,
  tips VARCHAR(255) DEFAULT NULL,
  img_src VARCHAR(255) DEFAULT NULL,
  date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  date_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX (movement_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE users_workouts (
    users_workouts_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    movement_id INT NOT NULL,
    movement_name VARCHAR(255) NOT NULL,
    workout_title VARCHAR(255) NOT NULL,
    workout_id INT NOT NULL,
    duration_minutes INT DEFAULT NULL,
    description TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (workout_id) REFERENCES workouts(workout_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    INDEX (workout_id),
    INDEX (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE workouts_movements (
    workouts_movements_id INT AUTO_INCREMENT PRIMARY KEY,
    movement_id INT NOT NULL,
    workout_id INT NOT NULL,         
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (movement_id) REFERENCES movements(movement_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (workout_id) REFERENCES workouts(workout_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    INDEX (movement_id, workout_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;