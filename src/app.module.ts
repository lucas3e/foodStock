import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CategoriasModule } from './modules/categorias/categorias.module';
import { AlimentosModule } from './modules/alimentos/alimentos.module';
import { EstoqueModule } from './modules/estoque/estoque.module';
import { CardapiosModule } from './modules/cardapios/cardapios.module';
import { RefeicoesModule } from './modules/refeicoes/refeicoes.module';
import { MovimentacoesModule } from './modules/movimentacoes/movimentacoes.module';
import { HistoricoCustoModule } from './modules/historico-custo/historico-custo.module';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => configService.get('database'),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    CategoriasModule,
    AlimentosModule,
    EstoqueModule,
    CardapiosModule,
    RefeicoesModule,
    MovimentacoesModule,
    HistoricoCustoModule,
  ],
})
export class AppModule {}
