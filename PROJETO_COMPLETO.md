# FoodStock - Sistema Completo de Gestão de Estoque Escolar

## Visão Geral

Este projeto implementa um sistema completo de gestão de estoque escolar usando NestJS, TypeORM e PostgreSQL, baseado na modelagem de dados fornecida.

## Estrutura do Projeto

```
foodstock/
├── src/
│   ├── config/
│   │   └── database.config.ts          # Configuração do banco de dados
│   ├── database/
│   │   ├── data-source.ts              # DataSource do TypeORM
│   │   ├── typeorm.config.ts           # Configuração TypeORM
│   │   └── migrations/                 # Migrations do banco
│   ├── modules/
│   │   ├── users/                      # Módulo de usuários
│   │   │   ├── entities/user.entity.ts
│   │   │   ├── dto/
│   │   │   ├── users.service.ts
│   │   │   ├── users.controller.ts
│   │   │   └── users.module.ts
│   │   ├── categorias/                 # Módulo de categorias
│   │   │   ├── entities/categoria.entity.ts
│   │   │   ├── dto/
│   │   │   ├── categorias.service.ts
│   │   │   ├── categorias.controller.ts
│   │   │   └── categorias.module.ts
│   │   ├── alimentos/                  # Módulo de alimentos
│   │   │   ├── entities/alimento.entity.ts
│   │   │   ├── dto/
│   │   │   ├── alimentos.service.ts
│   │   │   ├── alimentos.controller.ts
│   │   │   └── alimentos.module.ts
│   │   ├── estoque/                    # Módulo de estoque
│   │   │   ├── entities/estoque.entity.ts
│   │   │   ├── dto/
│   │   │   ├── estoque.service.ts
│   │   │   ├── estoque.controller.ts
│   │   │   └── estoque.module.ts
│   │   ├── cardapios/                  # Módulo de cardápios
│   │   │   ├── entities/cardapio.entity.ts
│   │   │   └── ...
│   │   ├── refeicoes/                  # Módulo de refeições
│   │   │   ├── entities/refeicao.entity.ts
│   │   │   ├── entities/refeicao-item.entity.ts
│   │   │   └── ...
│   │   ├── movimentacoes/              # Módulo de movimentações
│   │   │   ├── entities/movimentacao.entity.ts
│   │   │   └── ...
│   │   └── historico-custo/            # Módulo de histórico de custos
│   │       ├── entities/historico-custo.entity.ts
│   │       ├── historico-custo.service.ts
│   │       ├── historico-custo.controller.ts
│   │       └── historico-custo.module.ts
│   ├── app.module.ts                   # Módulo principal
│   └── main.ts                         # Ponto de entrada
├── .env                                # Variáveis de ambiente
├── .env.example                        # Exemplo de variáveis
├── package.json                        # Dependências e scripts
├── tsconfig.json                       # Configuração TypeScript
├── typeorm-cli.config.ts              # Configuração CLI TypeORM
└── README.md                          # Documentação
```

## Entidades Implementadas

### 1. User (Usuários)
- Gestão de usuários do sistema
- Tipos: admin, funcionario, nutricionista
- Senhas criptografadas com bcrypt

### 2. Categoria (Categorias)
- Categorização de alimentos
- Relacionamento 1:N com alimentos

### 3. Alimento (Alimentos)
- Cadastro de alimentos
- Informações nutricionais e de custo
- Relacionamento com categoria

### 4. Estoque
- Controle de estoque por lotes
- Rastreamento de validade e localização
- Status: disponível, reservado, vencido

### 5. Cardapio (Cardápios)
- Planejamento de cardápios por data
- Relacionamento com usuário criador

### 6. Refeicao (Refeições)
- Tipos de refeições (café, almoço, jantar)
- Relacionamento com cardápio

### 7. RefeicaoItem (Itens de Refeição)
- Itens específicos de cada refeição
- Quantidade e observações

### 8. Movimentacao (Movimentações)
- Registro de entradas e saídas
- Rastreamento completo de movimentações

### 9. HistoricoCusto (Histórico de Custos)
- Cálculo automático de custos mensais
- Relatórios de consumo e gastos

## Funcionalidades Especiais

### Histórico de Custos Automático

O sistema implementa um serviço especial para calcular automaticamente os custos mensais:

```typescript
// Cálculo automático no primeiro dia de cada mês
@Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
async atualizarHistoricoAutomatico(): Promise<void> {
  // Calcula custos do mês anterior
}
```

### Endpoints do Histórico de Custos

- `GET /historico-custo` - Lista todos os históricos
- `GET /historico-custo/relatorio?anoInicio=2024&anoFim=2024` - Relatório por período
- `GET /historico-custo/2024-01` - Histórico específico do mês
- `POST /historico-custo/calcular/2024/1` - Calcular custo de um mês específico
- `POST /historico-custo/recalcular-tudo` - Recalcular todo o histórico

### Validações Implementadas

- **class-validator**: Validação de dados de entrada
- **class-transformer**: Transformação e serialização
- **Relacionamentos**: Validação de integridade referencial
- **Enums**: Validação de valores permitidos

## Relacionamentos Implementados

Todos os relacionamentos da modelagem foram implementados:

```typescript
// Exemplo: Alimento -> Categoria
@ManyToOne(() => Categoria, categoria => categoria.alimentos)
@JoinColumn({ name: 'categoria_id' })
categoria: Categoria;

// Exemplo: Estoque -> Alimento
@ManyToOne(() => Alimento, alimento => alimento.estoques)
@JoinColumn({ name: 'alimento_id' })
alimento: Alimento;
```

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start:prod

# Migrations
npm run migration:generate
npm run migration:run
npm run migration:revert

# Testes
npm run test
npm run test:watch
npm run test:cov
```

## Configuração do Banco

1. Criar banco PostgreSQL:
```sql
CREATE DATABASE foodstock;
```

2. Configurar variáveis no `.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=foodstock
```

3. Executar migrations:
```bash
npm run migration:run
```

## Uso da API

### Exemplo: Criar Categoria
```bash
POST /categorias
{
  "nome": "Frutas",
  "descricao": "Frutas frescas e secas"
}
```

### Exemplo: Criar Alimento
```bash
POST /alimentos
{
  "nome": "Maçã",
  "categoriaId": 1,
  "unidadeMedida": "kg",
  "caloriasPorUnidade": 52,
  "custoMedio": 5.50
}
```

### Exemplo: Registrar Estoque
```bash
POST /estoque
{
  "alimentoId": 1,
  "quantidade": 100,
  "lote": "LOT001",
  "dataValidade": "2024-12-31",
  "dataEntrada": "2024-01-15",
  "origem": "Fornecedor A",
  "custoUnitario": 5.00,
  "localizacao": "Depósito A1",
  "status": "disponivel"
}
```

## Recursos Avançados

### 1. Cálculo Automático de Custos
O sistema calcula automaticamente os custos mensais baseado nas movimentações de saída.

### 2. Controle de Validade
Verificação automática de produtos vencidos e atualização de status.

### 3. Relatórios
Geração de relatórios detalhados de custos e consumo.

### 4. Validações Robustas
Validação completa de dados com mensagens de erro claras.

### 5. Relacionamentos Complexos
Implementação completa de todos os relacionamentos da modelagem.

## Próximos Passos

1. **Autenticação**: Implementar JWT para autenticação
2. **Autorização**: Controle de acesso por tipo de usuário
3. **Logs**: Sistema de auditoria completo
4. **Notificações**: Alertas de vencimento e estoque baixo
5. **Dashboard**: Interface web para visualização
6. **Backup**: Sistema de backup automático
7. **Testes**: Cobertura completa de testes unitários e integração

## Conclusão

Este projeto implementa um sistema completo e robusto para gestão de estoque escolar, seguindo as melhores práticas do NestJS e incluindo todas as funcionalidades solicitadas, especialmente o cálculo automático do histórico de custos baseado nas movimentações.
