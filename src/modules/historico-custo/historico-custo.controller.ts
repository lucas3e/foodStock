import { Controller, Get, Post, Query, Param } from '@nestjs/common';
import { HistoricoCustoService } from './historico-custo.service';
import { HistoricoCusto } from './entities/historico-custo.entity';

@Controller('historico-custo')
export class HistoricoCustoController {
  constructor(private readonly historicoCustoService: HistoricoCustoService) {}

  @Get()
  async findAll(): Promise<HistoricoCusto[]> {
    return this.historicoCustoService.getHistorico();
  }

  @Get('relatorio')
  async getRelatorioCustos(
    @Query('anoInicio') anoInicio?: string,
    @Query('anoFim') anoFim?: string,
  ): Promise<HistoricoCusto[]> {
    const anoInicioNum = anoInicio ? parseInt(anoInicio, 10) : new Date().getFullYear() - 1;
    const anoFimNum = anoFim ? parseInt(anoFim, 10) : new Date().getFullYear();
    
    return this.historicoCustoService.getRelatorioCustos(anoInicioNum, anoFimNum);
  }

  @Get('mes/:mesAno')
  async findByMesAno(@Param('mesAno') mesAno: string): Promise<HistoricoCusto[]> {
    return this.historicoCustoService.getHistorico(mesAno);
  }

  @Get('calculo/:ano/:mes')
  async calcularCustoMensal(
    @Param('ano') ano: string,
    @Param('mes') mes: string,
  ): Promise<{
    custoTotal: number;
    alimentosConsumidos: number;
    detalhes: HistoricoCusto | null;
  }> {
    const anoNum = parseInt(ano, 10);
    const mesNum = parseInt(mes, 10);
    
    return this.historicoCustoService.calcularCustoMensal(anoNum, mesNum);
  }

  @Post('recalcular')
  async recalcularTodoHistorico(): Promise<{ message: string; processados: number }> {
    return this.historicoCustoService.recalcularTodoHistorico();
  }

  @Get('resumo/:ano')
  async getResumoAnual(@Param('ano') ano: string): Promise<{
    custoTotal: number;
    alimentosConsumidos: number;
    mediaMensal: number;
  }> {
    return this.historicoCustoService.getResumoAnual(ano);
  }
}
