import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoricoCusto } from './entities/historico-custo.entity';
import { Movimentacao } from '../movimentacoes/entities/movimentacao.entity';

@Injectable()
export class HistoricoCustoService {
  constructor(
    @InjectRepository(HistoricoCusto)
    private readonly historicoCustoRepository: Repository<HistoricoCusto>,
  ) {}

  async atualizarHistorico(movimentacao: Movimentacao): Promise<void> {
    const mesAno = this.getMesAno(movimentacao.data);
    
    let historico = await this.historicoCustoRepository.findOne({
      where: { mesAno }
    });

    if (!historico) {
      historico = this.historicoCustoRepository.create({
        mesAno,
        custoTotal: 0,
        alimentosConsumidos: 0,
      });
    }

    // Atualiza o histórico baseado no tipo de movimentação
    switch (movimentacao.tipo) {
      case 'consumo':
        historico.alimentosConsumidos += 1;
        historico.custoTotal = Number(historico.custoTotal) + 
          (Number(movimentacao.quantidade) * Number(movimentacao.alimento.custoMedio));
        break;
      
      case 'perda':
        historico.custoTotal = Number(historico.custoTotal) + 
          (Number(movimentacao.quantidade) * Number(movimentacao.alimento.custoMedio));
        break;
    }

    await this.historicoCustoRepository.save(historico);
  }

  private getMesAno(data: Date): string {
    const year = data.getFullYear();
    const month = String(data.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  }

  async getHistorico(mesAno?: string): Promise<HistoricoCusto[]> {
    if (mesAno) {
      return this.historicoCustoRepository.find({
        where: { mesAno },
        order: { mesAno: 'DESC' }
      });
    }
    
    return this.historicoCustoRepository.find({
      order: { mesAno: 'DESC' }
    });
  }

  async getResumoAnual(ano: string): Promise<{
    custoTotal: number;
    alimentosConsumidos: number;
    mediaMensal: number;
  }> {
    const historicos = await this.historicoCustoRepository.find({
      where: { mesAno: `${ano}-%` }
    });

    const custoTotal = historicos.reduce((sum, h) => sum + Number(h.custoTotal), 0);
    const alimentosConsumidos = historicos.reduce((sum, h) => sum + h.alimentosConsumidos, 0);
    const mediaMensal = historicos.length > 0 ? custoTotal / historicos.length : 0;

    return {
      custoTotal,
      alimentosConsumidos,
      mediaMensal
    };
  }

  async findAll(): Promise<HistoricoCusto[]> {
    return this.historicoCustoRepository.find({
      order: { mesAno: 'DESC' }
    });
  }

  async getRelatorioCustos(anoInicio: number, anoFim: number): Promise<HistoricoCusto[]> {
    const query = this.historicoCustoRepository.createQueryBuilder('historico');
    
    query.where('EXTRACT(YEAR FROM TO_DATE(historico.mesAno, \'YYYY-MM\')) BETWEEN :anoInicio AND :anoFim', {
      anoInicio,
      anoFim
    });
    
    query.orderBy('historico.mesAno', 'DESC');
    
    return query.getMany();
  }

  async findByMesAno(mesAno: string): Promise<HistoricoCusto[]> {
    return this.historicoCustoRepository.find({
      where: { mesAno },
      order: { mesAno: 'DESC' }
    });
  }

  async calcularCustoMensal(ano: number, mes: number): Promise<{
    custoTotal: number;
    alimentosConsumidos: number;
    detalhes: HistoricoCusto | null;
  }> {
    const mesAno = `${ano}-${String(mes).padStart(2, '0')}`;
    
    const historico = await this.historicoCustoRepository.findOne({
      where: { mesAno }
    });

    if (!historico) {
      return {
        custoTotal: 0,
        alimentosConsumidos: 0,
        detalhes: null
      };
    }

    return {
      custoTotal: Number(historico.custoTotal),
      alimentosConsumidos: historico.alimentosConsumidos,
      detalhes: historico
    };
  }

  async recalcularTodoHistorico(): Promise<{ message: string; processados: number }> {
    // Remove todos os registros existentes
    await this.historicoCustoRepository.clear();

    // Busca todas as movimentações de consumo e perda
    const movimentacoes = await this.historicoCustoRepository.manager
      .getRepository('movimentacoes')
      .find({
        where: [
          { tipo: 'consumo' },
          { tipo: 'perda' }
        ],
        relations: ['alimento'],
        order: { data: 'ASC' }
      });

    // Reprocessa cada movimentação
    for (const movimentacao of movimentacoes) {
      await this.atualizarHistorico(movimentacao as any);
    }

    return {
      message: 'Histórico recalculado com sucesso',
      processados: movimentacoes.length
    };
  }
}
