CREATE DATABASE IF NOT EXISTS app_db;
USE app_db;

CREATE TABLE IF NOT EXISTS users (
    user_id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    email VARCHAR(64),
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS login_histories (
    history_id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (history_id , user_id),
    FOREIGN KEY (user_id)
        REFERENCES users (user_id)
        ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS class (
    class_id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    history_id INT,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (history_id , class_id),
    FOREIGN KEY (history_id)
        REFERENCES login_histories (history_id)
        ON UPDATE RESTRICT ON DELETE CASCADE
);