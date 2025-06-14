import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { User, UserType } from '../../modules/users/entities/user.entity';
import { Categoria } from '../../modules/categorias/entities/categoria.entity';
import { Alimento } from '../../modules/alimentos/entities/alimento.entity';
import * as bcrypt from 'bcrypt';

export class InitialDataSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    // Create admin user
    const userRepository = dataSource.getRepository(User);
    const adminUser = await userRepository.save({
      nome: 'Administrador',
      email: 'admin@foodstock.com',
      senha_hash: await bcrypt.hash('admin123', 10),
      tipo: 'admin',
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    });

    // Create initial categories
    const categoriaRepository = dataSource.getRepository(Categoria);
    const categories = await categoriaRepository.save([
      {
        nome: 'Grãos',
        descricao: 'Arroz, feijão, milho e outros grãos',
      },
      {
        nome: 'Proteínas',
        descricao: 'Carnes, ovos e proteínas em geral',
      },
      {
        nome: 'Hortifruti',
        descricao: 'Frutas, verduras e legumes',
      },
      {
        nome: 'Laticínios',
        descricao: 'Leite, queijos e derivados',
      },
    ]);

    // Create initial food items
    const alimentoRepository = dataSource.getRepository(Alimento);
    await alimentoRepository.save([
      {
        nome: 'Arroz',
        categoriaId: categories[0].id,
        unidadeMedida: 'kg',
        caloriasPorUnidade: 130,
        custoMedio: 5.50,
      },
      {
        nome: 'Feijão',
        categoriaId: categories[0].id,
        unidadeMedida: 'kg',
        caloriasPorUnidade: 120,
        custoMedio: 8.90,
      },
      {
        nome: 'Peito de Frango',
        categoriaId: categories[1].id,
        unidadeMedida: 'kg',
        caloriasPorUnidade: 165,
        custoMedio: 15.90,
      },
      {
        nome: 'Alface',
        categoriaId: categories[2].id,
        unidadeMedida: 'unidade',
        caloriasPorUnidade: 15,
        custoMedio: 2.50,
      },
      {
        nome: 'Leite',
        categoriaId: categories[3].id,
        unidadeMedida: 'litro',
        caloriasPorUnidade: 120,
        custoMedio: 4.90,
      },
    ]);
  }
}
