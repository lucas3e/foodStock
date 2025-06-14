import { DataSource } from 'typeorm';
import { runSeeders } from 'typeorm-extension';
import { InitialDataSeeder } from './seeds/initial-data.seed';
import { User } from '../modules/users/entities/user.entity';
import { Categoria } from '../modules/categorias/entities/categoria.entity';
import { Alimento } from '../modules/alimentos/entities/alimento.entity';
import { Estoque } from '../modules/estoque/entities/estoque.entity';
import { Cardapio } from '../modules/cardapios/entities/cardapio.entity';
import { Refeicao } from '../modules/refeicoes/entities/refeicao.entity';
import { RefeicaoItem } from '../modules/refeicoes/entities/refeicao-item.entity';
import { Movimentacao } from '../modules/movimentacoes/entities/movimentacao.entity';
import { HistoricoCusto } from '../modules/historico-custo/entities/historico-custo.entity';
import { join } from 'path';

async function runSeeds() {
  const dataSource = new DataSource({
    type: 'sqlite',
    database: join(__dirname, '..', '..', 'data', 'foodstock.sqlite'),
    entities: [
      User,
      Categoria,
      Alimento,
      Estoque,
      Cardapio,
      Refeicao,
      RefeicaoItem,
      Movimentacao,
      HistoricoCusto,
    ],
    synchronize: true,
    logging: true,
  });

  await dataSource.initialize();

  await runSeeders(dataSource, {
    seeds: [InitialDataSeeder],
  });

  await dataSource.destroy();
  console.log('✅ Seeds executados com sucesso!');
}

runSeeds().catch((error) => {
  console.error('❌ Erro ao executar seeds:', error);
  process.exit(1);
});
