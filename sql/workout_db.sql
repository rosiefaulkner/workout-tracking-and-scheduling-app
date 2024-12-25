--Clean up local
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `equipment`;
DROP TABLE IF EXISTS `workouts`;
DROP TABLE IF EXISTS `workouts_movements`;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,  
    email VARCHAR(100) NOT NULL UNIQUE,   
    password_hash VARCHAR(255) NOT NULL,  
    first_name VARCHAR(50),             
    last_name VARCHAR(50),              
    date_of_birth DATE,                   
    gender ENUM('Male', 'Female', 'Other'),
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
    workout_type VARCHAR(50) NOT NULL,      
    duration_minutes INT NOT NULL,             
    intensity ENUM('Low', 'Medium', 'High'),   
    description TEXT,                                
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    INDEX (workout_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE movements (
    movement_id INT AUTO_INCREMENT PRIMARY KEY,
    movement_name VARCHAR(50) NOT NULL, 
    equipment_id INT NOT NULL,      
    description TEXT,                                
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    INDEX (movement_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE workouts_movements (
    workouts_movements_id INT AUTO_INCREMENT PRIMARY KEY,
    movement_id INT NOT NULL,
    equipment_id INT NOT NULL,
    workout_id INT NOT NULL,         
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (equipment_id) REFERENCES equipment(equipment_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (workout_id) REFERENCES workouts(workout_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    INDEX (movement_id, equipment_id, workout_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;