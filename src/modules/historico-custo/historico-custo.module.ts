import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoricoCusto } from './entities/historico-custo.entity';
import { HistoricoCustoService } from './historico-custo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([HistoricoCusto]),
  ],
  providers: [HistoricoCustoService],
  exports: [HistoricoCustoService],
})
export class HistoricoCustoModule {}
