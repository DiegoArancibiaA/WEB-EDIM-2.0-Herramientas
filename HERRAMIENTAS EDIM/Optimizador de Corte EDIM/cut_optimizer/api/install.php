<?php
require 'config.php';

try {
    $pdo = new PDO("mysql:host=".DB_HOST, DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $pdo->exec("CREATE DATABASE IF NOT EXISTS ".DB_NAME." CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    $pdo->exec("USE ".DB_NAME);

    $pdo->exec("CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        client VARCHAR(255),
        company VARCHAR(255),
        operator VARCHAR(100),
        date DATE,
        material VARCHAR(50),
        thickness DECIMAL(10,2),
        unit VARCHAR(10),
        notes TEXT,
        config JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB");

    $pdo->exec("CREATE TABLE IF NOT EXISTS plates (
        id INT AUTO_INCREMENT PRIMARY KEY,
        project_id INT,
        quantity INT DEFAULT 1,
        length DECIMAL(10,2),
        width DECIMAL(10,2),
        thickness DECIMAL(10,2),
        cost DECIMAL(10,2),
        supplier VARCHAR(100),
        code VARCHAR(100),
        color VARCHAR(50),
        notes TEXT,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
    ) ENGINE=InnoDB");

    $pdo->exec("CREATE TABLE IF NOT EXISTS pieces (
        id INT AUTO_INCREMENT PRIMARY KEY,
        project_id INT,
        quantity INT DEFAULT 1,
        name VARCHAR(255),
        code VARCHAR(100),
        length DECIMAL(10,2),
        width DECIMAL(10,2),
        thickness DECIMAL(10,2),
        priority INT DEFAULT 1,
        material VARCHAR(50),
        notes TEXT,
        color VARCHAR(20),
        allow_rotation TINYINT(1) DEFAULT 1,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
    ) ENGINE=InnoDB");

    $pdo->exec("CREATE TABLE IF NOT EXISTS optimizations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        project_id INT,
        algorithm VARCHAR(50),
        stats JSON,
        result_data LONGTEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
    ) ENGINE=InnoDB");

    jsonResponse(true, 'Base de datos instalada correctamente');
} catch (PDOException $e) {
    jsonResponse(false, 'Error: ' . $e->getMessage());
}
?>
