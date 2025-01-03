# Workout Tracking and Scheduling App

This is a PHP-based application designed to help users track their workouts and schedule them at convenient times. The app allows users to manage their personal information, create workout routines, and schedule workouts using flexible date and time options.

## Features

- **User Management**: 
  - Register and manage user accounts with basic information such as first name, last name, email, and password (hashed for security).
  
- **Workout Tracking**:
  - Add, view, and manage a list of workouts with customizable details (e.g., exercise type, repetitions).
  
- **Workout Scheduling**:
  - Schedule workouts for specific times and dates. If no date is provided, the workout will be scheduled for the current date and time.
  
- **Password Security**: 
  - Secure password storage using PHP’s `password_hash` and `password_verify` functions.

- **Flexible Design**:
  - Easy-to-extend codebase that can be expanded with features like workout history, exercise categories, and more.

## Technologies Used

- PHP
- DateTime class for handling scheduling
- Object-oriented programming (OOP) principles

## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/workout-tracking-scheduling-app.git
   ```

2. Install PHP on your machine, if not already installed.

3. Open the `index.php` file in your browser or run the app on a local PHP server.

4. Customize the controllers and models as needed for your use case.

## License

This project is licensed under the MIT License - see the LICENSE file for details.


