# FoodStock - Sistema de Gestão de Estoque Escolar

Sistema completo para gestão de estoque de alimentos em escolas, desenvolvido com NestJS (backend) e React (frontend).

## 🚀 Funcionalidades

- **Gestão de Usuários**: Controle de acesso com diferentes níveis de permissão
- **Gestão de Estoque**: Controle completo de alimentos e quantidades
- **Gestão de Cardápios**: Planejamento de refeições e cálculo nutricional
- **Relatórios**: Análise de custos e consumo
- **Histórico de Custos**: Acompanhamento financeiro mensal
- **Movimentações**: Registro de entradas e saídas do estoque

## 🛠️ Tecnologias

### Backend
- **NestJS** - Framework Node.js
- **TypeORM** - ORM para banco de dados
- **SQLite** - Banco de dados
- **JWT** - Autenticação
- **bcrypt** - Criptografia de senhas

### Frontend
- **React** - Biblioteca para interface
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS
- **Vite** - Build tool

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

## 🔧 Instalação e Configuração

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd foodstock
```

### 2. Instale as dependências do backend
```bash
npm install
```

### 3. Instale as dependências do frontend
```bash
cd frontend
npm install
cd ..
```

### 4. Configure o banco de dados
O sistema usa SQLite, que não requer instalação adicional. O banco será criado automaticamente.

### 5. Execute as migrações e seeds
```bash
# Criar o banco e tabelas
npm run start:dev

# Em outro terminal, execute os seeds para dados iniciais
npm run seed
```

### 6. Inicie o backend
```bash
npm run start:dev
```
O backend estará disponível em `http://localhost:3000`

### 7. Inicie o frontend
```bash
cd frontend
npm run dev
```
O frontend estará disponível em `http://localhost:5173`

## 👤 Usuário Padrão

Após executar os seeds, você pode fazer login com:
- **Email**: admin@foodstock.com
- **Senha**: admin123
- **Tipo**: Administrador

## 📁 Estrutura do Projeto

```
foodstock/
├── src/                          # Backend (NestJS)
│   ├── modules/                  # Módulos da aplicação
│   │   ├── auth/                # Autenticação
│   │   ├── users/               # Usuários
│   │   ├── categorias/          # Categorias de alimentos
│   │   ├── alimentos/           # Alimentos
│   │   ├── estoque/             # Estoque
│   │   ├── cardapios/           # Cardápios
│   │   ├── refeicoes/           # Refeições
│   │   ├── movimentacoes/       # Movimentações
│   │   └── historico-custo/     # Histórico de custos
│   ├── database/                # Configurações do banco
│   │   └── seeds/               # Dados iniciais
│   └── config/                  # Configurações
├── frontend/                     # Frontend (React)
│   ├── src/
│   │   ├── components/          # Componentes reutilizáveis
│   │   ├── pages/               # Páginas da aplicação
│   │   ├── contexts/            # Contextos React
│   │   └── services/            # Serviços de API
└── data/                        # Banco de dados SQLite
```

## 🔗 Endpoints da API

### Autenticação
- `POST /auth/login` - Login
- `POST /auth/register` - Registro

### Usuários
- `GET /users` - Listar usuários
- `POST /users` - Criar usuário
- `PUT /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Deletar usuário

### Categorias
- `GET /categorias` - Listar categorias
- `POST /categorias` - Criar categoria
- `PUT /categorias/:id` - Atualizar categoria
- `DELETE /categorias/:id` - Deletar categoria

### Alimentos
- `GET /alimentos` - Listar alimentos
- `POST /alimentos` - Criar alimento
- `PUT /alimentos/:id` - Atualizar alimento
- `DELETE /alimentos/:id` - Deletar alimento

### Estoque
- `GET /estoque` - Listar estoque
- `POST /estoque` - Adicionar item ao estoque
- `PUT /estoque/:id` - Atualizar item do estoque
- `DELETE /estoque/:id` - Remover item do estoque

### Cardápios
- `GET /cardapios` - Listar cardápios
- `POST /cardapios` - Criar cardápio
- `PUT /cardapios/:id` - Atualizar cardápio
- `DELETE /cardapios/:id` - Deletar cardápio

### Relatórios
- `GET /historico-custo` - Histórico de custos
- `GET /historico-custo/relatorio` - Relatório de custos
- `POST /historico-custo/recalcular` - Recalcular custos

## 🎨 Interface

O sistema possui uma interface moderna e responsiva com:

- **Login**: Tela de autenticação com logo e formulário limpo
- **Dashboard**: Visão geral com métricas e gráficos
- **Gestão de Estoque**: Tabela com filtros e modal para adicionar itens
- **Gestão de Usuários**: Lista de usuários com controle de permissões
- **Gestão de Cardápios**: Planejamento de refeições com cálculo de calorias
- **Relatórios**: Gráficos e tabelas para análise de dados

## 🔒 Segurança

- Autenticação JWT
- Senhas criptografadas com bcrypt
- Validação de dados com class-validator
- Guards para proteção de rotas

## 📊 Banco de Dados

O sistema utiliza SQLite com as seguintes tabelas:

- `users` - Usuários do sistema
- `categorias` - Categorias de alimentos
- `alimentos` - Cadastro de alimentos
- `estoque` - Controle de estoque
- `cardapios` - Cardápios planejados
- `refeicoes` - Refeições do cardápio
- `refeicao_items` - Itens das refeições
- `movimentacoes` - Movimentações do estoque
- `historico_custo` - Histórico de custos mensais

## 🚀 Deploy

Para deploy em produção:

1. Configure as variáveis de ambiente
2. Execute o build do frontend: `cd frontend && npm run build`
3. Execute o build do backend: `npm run build`
4. Configure um servidor web (nginx, apache)
5. Configure um gerenciador de processos (PM2)

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte e dúvidas, entre em contato através do email: suporte@foodstock.com
