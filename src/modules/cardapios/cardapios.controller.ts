import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CardapiosService } from './cardapios.service';
import { CreateCardapioDto } from './dto/create-cardapio.dto';
import { UpdateCardapioDto } from './dto/update-cardapio.dto';
import { Cardapio } from './entities/cardapio.entity';

@Controller('cardapios')
@UseGuards(JwtAuthGuard)
export class CardapiosController {
  constructor(private readonly cardapiosService: CardapiosService) {}

  @Post()
  create(@Body() createCardapioDto: CreateCardapioDto): Promise<Cardapio> {
    return this.cardapiosService.create(createCardapioDto);
  }

  @Get()
  findAll(): Promise<Cardapio[]> {
    return this.cardapiosService.findAll();
  }

  @Get('semana')
  getCardapiosSemana(): Promise<Cardapio[]> {
    return this.cardapiosService.getCardapiosSemana();
  }

  @Get('periodo')
  findByPeriod(
    @Query('inicio') inicio: string,
    @Query('fim') fim: string,
  ): Promise<Cardapio[]> {
    const startDate = new Date(inicio);
    const endDate = new Date(fim);
    return this.cardapiosService.findByPeriod(startDate, endDate);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Cardapio> {
    return this.cardapiosService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCardapioDto: UpdateCardapioDto,
  ): Promise<Cardapio> {
    return this.cardapiosService.update(+id, updateCardapioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.cardapiosService.remove(+id);
  }
}
