import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Refeicao } from './entities/refeicao.entity';
import { RefeicaoItem } from './entities/refeicao-item.entity';
import { RefeicoesService } from './refeicoes.service';
import { RefeicoesController } from './refeicoes.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Refeicao, RefeicaoItem])
  ],
  controllers: [RefeicoesController],
  providers: [RefeicoesService],
  exports: [RefeicoesService],
})
export class RefeicoesModule {}
