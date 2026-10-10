-- ======================================
-- SCREACIÓN DE BASE DE DATOS - NEXUSCRM
-- ======================================

-- 1. Crear la Base de Datos con codificación para español (acentos, eñes)
CREATE DATABASE IF NOT EXISTS nexuscrm
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE nexuscrm;

-- 2. TABLA DE CUENTAS (Módulo del Sprint 2)
CREATE TABLE IF NOT EXISTS accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    industry VARCHAR(100) NOT NULL, -- Giro o sector de la empresa
    status ENUM('Prospecto', 'Activo', 'Inactivo') DEFAULT 'Prospecto',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. TABLA DE CONTACTOS (Módulo de Contactos)
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    account_id INT NOT NULL, -- Relación directa con la cuenta
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 4. TABLA DE OPORTUNIDADES / NEGOCIOS (Módulo del Sprint 3 - Kanban)
CREATE TABLE IF NOT EXISTS deals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    account_id INT NOT NULL, -- Relación directa con la cuenta
    title VARCHAR(150) NOT NULL,
    amount DECIMAL(12,2) NOT NULL DEFAULT 0.00, -- Monto económico del negocio
    stage ENUM('PROSPECCION', 'CALIFICACION', 'PROPUESTA', 'NEGOCIACION', 'GANADO', 'PERDIDO') DEFAULT 'PROSPECCION',
    probability INT DEFAULT 20, -- Porcentaje de éxito de la venta
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- =================
-- DATOS DE PRUEBA 
-- =================

-- Insertar Cuentas Base
INSERT INTO accounts (id, name, industry, status) VALUES
(1, 'Acme Corp', 'Tecnología', 'Activo'),
(2, 'Tech Solutions', 'Consultoría', 'Prospecto');

-- Insertar Oportunidades asociadas para que pinten en el Kanban
INSERT INTO deals (id, account_id, title, amount, stage, probability) VALUES
(101, 1, 'Licencias Enterprise', 120000.00, 'PROSPECCION', 20),
(102, 2, 'Consultoría Cloud', 45000.00, 'PROPUESTA', 60);
