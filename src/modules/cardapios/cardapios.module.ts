import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cardapio } from './entities/cardapio.entity';
import { CardapiosService } from './cardapios.service';
import { CardapiosController } from './cardapios.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cardapio]),
    UsersModule,
  ],
  controllers: [CardapiosController],
  providers: [CardapiosService],
  exports: [CardapiosService],
})
export class CardapiosModule {}
