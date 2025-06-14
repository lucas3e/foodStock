import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RefeicoesService } from './refeicoes.service';
import { CreateRefeicaoDto } from './dto/create-refeicao.dto';
import { UpdateRefeicaoDto } from './dto/update-refeicao.dto';
import { Refeicao } from './entities/refeicao.entity';

@Controller('refeicoes')
@UseGuards(JwtAuthGuard)
export class RefeicoesController {
  constructor(private readonly refeicoesService: RefeicoesService) {}

  @Post()
  create(@Body() createRefeicaoDto: CreateRefeicaoDto): Promise<Refeicao> {
    return this.refeicoesService.create(createRefeicaoDto);
  }

  @Get()
  findAll(): Promise<Refeicao[]> {
    return this.refeicoesService.findAll();
  }

  @Get('estatisticas')
  getEstatisticasRefeicoes(): Promise<{
    totalRefeicoes: number;
    porTipo: { [key: string]: number };
    caloriasMedias: { [key: string]: number };
  }> {
    return this.refeicoesService.getEstatisticasRefeicoes();
  }

  @Get('cardapio/:cardapioId')
  findByCardapio(@Param('cardapioId') cardapioId: string): Promise<Refeicao[]> {
    return this.refeicoesService.findByCardapio(+cardapioId);
  }

  @Get('tipo/:tipo')
  findByTipo(@Param('tipo') tipo: string): Promise<Refeicao[]> {
    return this.refeicoesService.findByTipo(tipo);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Refeicao> {
    return this.refeicoesService.findOne(+id);
  }

  @Get(':id/calorias')
  calcularCaloriasTotais(@Param('id') id: string): Promise<number> {
    return this.refeicoesService.calcularCaloriasTotais(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateRefeicaoDto: UpdateRefeicaoDto,
  ): Promise<Refeicao> {
    return this.refeicoesService.update(+id, updateRefeicaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.refeicoesService.remove(+id);
  }
}
