import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { join } from 'path';
import { InitialDataSeeder } from './seeds/initial-data.seed';

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'sqlite',
  database: join(__dirname, '..', '..', 'data', 'foodstock.sqlite'),
  entities: [join(__dirname, '..', '**', '*.entity{.ts,.js}')],
  migrations: [join(__dirname, 'migrations', '*{.ts,.js}')],
  seeds: [InitialDataSeeder],
  synchronize: true,
  logging: true,
};

export const AppDataSource = new DataSource(dataSourceOptions);
