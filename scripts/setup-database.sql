-- FoodStock Database Setup Script
-- Execute this script to create the database and initial data

-- Create database (run this as postgres superuser)
-- CREATE DATABASE foodstock;

-- Connect to foodstock database and run the following:

-- Enable UUID extension if needed
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Insert initial categories
INSERT INTO categorias (nome, descricao, cor) VALUES
('Cereais', 'Arroz, feijão, macarrão e outros cereais', '#FFB74D'),
('Proteínas', 'Carnes, ovos, leite e derivados', '#F06292'),
('Vegetais', 'Verduras, legumes e frutas', '#81C784'),
('Temperos', 'Condimentos, especiarias e temperos', '#9575CD'),
('Bebidas', 'Sucos, água, leite e outras bebidas', '#4FC3F7'),
('Doces', 'Açúcar, mel, doces e sobremesas', '#FFD54F')
ON CONFLICT (nome) DO NOTHING;

-- Insert sample foods
INSERT INTO alimentos (nome, categoria_id, unidade_medida, calorias_por_unidade, custo_medio) VALUES
('Arroz Branco', (SELECT id FROM categorias WHERE nome = 'Cereais'), 'kg', 1300, 4.50),
('Feijão Carioca', (SELECT id FROM categorias WHERE nome = 'Cereais'), 'kg', 1400, 6.00),
('Macarrão Espaguete', (SELECT id FROM categorias WHERE nome = 'Cereais'), 'kg', 3500, 3.20),
('Frango (Peito)', (SELECT id FROM categorias WHERE nome = 'Proteínas'), 'kg', 1650, 12.00),
('Ovos', (SELECT id FROM categorias WHERE nome = 'Proteínas'), 'dúzia', 780, 8.50),
('Leite Integral', (SELECT id FROM categorias WHERE nome = 'Proteínas'), 'litro', 640, 4.20),
('Tomate', (SELECT id FROM categorias WHERE nome = 'Vegetais'), 'kg', 180, 5.50),
('Cebola', (SELECT id FROM categorias WHERE nome = 'Vegetais'), 'kg', 400, 3.80),
('Batata', (SELECT id FROM categorias WHERE nome = 'Vegetais'), 'kg', 770, 2.90),
('Sal', (SELECT id FROM categorias WHERE nome = 'Temperos'), 'kg', 0, 1.50),
('Óleo de Soja', (SELECT id FROM categorias WHERE nome = 'Temperos'), 'litro', 8840, 5.20),
('Açúcar Cristal', (SELECT id FROM categorias WHERE nome = 'Doces'), 'kg', 3870, 3.50)
ON CONFLICT (nome) DO NOTHING;

-- Insert default admin user (password: admin123)
-- Note: In production, use a proper password hash
INSERT INTO users (nome, email, senha, tipo) VALUES
('Administrador', 'admin@foodstock.com', '$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQq', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert sample stock items
INSERT INTO estoque (alimento_id, quantidade, data_validade, lote, localizacao, status) VALUES
((SELECT id FROM alimentos WHERE nome = 'Arroz Branco'), 50.0, '2024-12-31', 'ARR001', 'Depósito A - Prateleira 1', 'disponivel'),
((SELECT id FROM alimentos WHERE nome = 'Feijão Carioca'), 30.0, '2024-11-30', 'FEI001', 'Depósito A - Prateleira 2', 'disponivel'),
((SELECT id FROM alimentos WHERE nome = 'Frango (Peito)'), 15.0, '2024-02-15', 'FRA001', 'Freezer 1', 'disponivel'),
((SELECT id FROM alimentos WHERE nome = 'Leite Integral'), 20.0, '2024-02-10', 'LEI001', 'Geladeira 1', 'disponivel');

COMMIT;
