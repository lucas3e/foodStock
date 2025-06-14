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
import { MovimentacoesService } from './movimentacoes.service';
import { CreateMovimentacaoDto } from './dto/create-movimentacao.dto';
import { UpdateMovimentacaoDto } from './dto/update-movimentacao.dto';
import { Movimentacao } from './entities/movimentacao.entity';

@Controller('movimentacoes')
@UseGuards(JwtAuthGuard)
export class MovimentacoesController {
  constructor(private readonly movimentacoesService: MovimentacoesService) {}

  @Post()
  create(@Body() createMovimentacaoDto: CreateMovimentacaoDto): Promise<Movimentacao> {
    return this.movimentacoesService.create(createMovimentacaoDto);
  }

  @Get()
  findAll(): Promise<Movimentacao[]> {
    return this.movimentacoesService.findAll();
  }

  @Get('relatorio')
  getRelatorioMovimentacoes(
    @Query('mes') mes: number,
    @Query('ano') ano: number,
  ): Promise<{
    entradas: number;
    saidas: number;
    consumo: number;
    perdas: number;
    ajustes: number;
  }> {
    return this.movimentacoesService.getRelatorioMovimentacoes(mes, ano);
  }

  @Get('periodo')
  findByPeriod(
    @Query('inicio') inicio: string,
    @Query('fim') fim: string,
  ): Promise<Movimentacao[]> {
    const startDate = new Date(inicio);
    const endDate = new Date(fim);
    return this.movimentacoesService.findByPeriod(startDate, endDate);
  }

  @Get('tipo/:tipo')
  findByTipo(@Param('tipo') tipo: 'entrada' | 'saida' | 'ajuste' | 'consumo' | 'perda'): Promise<Movimentacao[]> {
    return this.movimentacoesService.findByTipo(tipo);
  }

  @Get('alimento/:alimentoId')
  findByAlimento(@Param('alimentoId') alimentoId: string): Promise<Movimentacao[]> {
    return this.movimentacoesService.findByAlimento(+alimentoId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Movimentacao> {
    return this.movimentacoesService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateMovimentacaoDto: UpdateMovimentacaoDto,
  ): Promise<Movimentacao> {
    return this.movimentacoesService.update(+id, updateMovimentacaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.movimentacoesService.remove(+id);
  }
}
