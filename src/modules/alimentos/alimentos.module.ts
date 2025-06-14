import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alimento } from './entities/alimento.entity';
import { AlimentosService } from './alimentos.service';
import { AlimentosController } from './alimentos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Alimento])],
  controllers: [AlimentosController],
  providers: [AlimentosService],
  exports: [AlimentosService],
})
export class AlimentosModule {}
