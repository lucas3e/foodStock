import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Movimentacao } from './entities/movimentacao.entity';

type TipoMovimentacao = 'entrada' | 'saida' | 'ajuste' | 'consumo' | 'perda';
import { CreateMovimentacaoDto } from './dto/create-movimentacao.dto';
import { UpdateMovimentacaoDto } from './dto/update-movimentacao.dto';
import { HistoricoCustoService } from '../historico-custo/historico-custo.service';

@Injectable()
export class MovimentacoesService {
  constructor(
    @InjectRepository(Movimentacao)
    private readonly movimentacaoRepository: Repository<Movimentacao>,
    private readonly historicoCustoService: HistoricoCustoService,
  ) {}

  async create(createMovimentacaoDto: CreateMovimentacaoDto): Promise<Movimentacao> {
    const movimentacao = this.movimentacaoRepository.create({
      ...createMovimentacaoDto,
      data: new Date(),
    });

    const savedMovimentacao = await this.movimentacaoRepository.save(movimentacao);

    // Atualiza o histórico de custos para movimentações relevantes
    if (['consumo', 'perda'].includes(createMovimentacaoDto.tipo)) {
      await this.historicoCustoService.atualizarHistorico(savedMovimentacao);
    }

    return savedMovimentacao;
  }

  async findAll(): Promise<Movimentacao[]> {
    return this.movimentacaoRepository.find({
      relations: ['alimento', 'estoque', 'cardapio', 'usuario'],
      order: { data: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Movimentacao> {
    const movimentacao = await this.movimentacaoRepository.findOne({
      where: { id },
      relations: ['alimento', 'estoque', 'cardapio', 'usuario'],
    });

    if (!movimentacao) {
      throw new NotFoundException(`Movimentação com ID ${id} não encontrada`);
    }

    return movimentacao;
  }

  async findByPeriod(startDate: Date, endDate: Date): Promise<Movimentacao[]> {
    return this.movimentacaoRepository.find({
      where: {
        data: Between(startDate, endDate),
      },
      relations: ['alimento', 'estoque', 'cardapio', 'usuario'],
      order: { data: 'ASC' },
    });
  }

  async findByTipo(tipo: TipoMovimentacao): Promise<Movimentacao[]> {
    return this.movimentacaoRepository.find({
      where: { tipo },
      relations: ['alimento', 'estoque', 'cardapio', 'usuario'],
      order: { data: 'DESC' },
    });
  }

  async findByAlimento(alimentoId: number): Promise<Movimentacao[]> {
    return this.movimentacaoRepository.find({
      where: { alimentoId },
      relations: ['alimento', 'estoque', 'cardapio', 'usuario'],
      order: { data: 'DESC' },
    });
  }

  async update(id: number, updateMovimentacaoDto: UpdateMovimentacaoDto): Promise<Movimentacao> {
    const movimentacao = await this.findOne(id);
    
    // Se estiver alterando o tipo para ou de 'consumo'/'perda', precisa atualizar o histórico
    const tipoAlterado = updateMovimentacaoDto.tipo && updateMovimentacaoDto.tipo !== movimentacao.tipo;
    const envolveHistorico = ['consumo', 'perda'].includes(movimentacao.tipo) || 
      (updateMovimentacaoDto.tipo && ['consumo', 'perda'].includes(updateMovimentacaoDto.tipo));

    if (tipoAlterado && envolveHistorico) {
      // TODO: Implementar lógica para atualizar histórico quando uma movimentação é alterada
      // Isso pode envolver reverter o registro anterior e criar um novo
    }

    await this.movimentacaoRepository.update(id, updateMovimentacaoDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const movimentacao = await this.findOne(id);
    
    // Se for uma movimentação que afeta o histórico, precisa atualizar
    if (['consumo', 'perda'].includes(movimentacao.tipo)) {
      // TODO: Implementar lógica para atualizar histórico quando uma movimentação é removida
      // Isso pode envolver reverter o registro do histórico
    }

    await this.movimentacaoRepository.remove(movimentacao);
  }

  async getRelatorioMovimentacoes(mes: number, ano: number): Promise<{
    entradas: number;
    saidas: number;
    consumo: number;
    perdas: number;
    ajustes: number;
  }> {
    const startDate = new Date(ano, mes - 1, 1);
    const endDate = new Date(ano, mes, 0);

    const movimentacoes = await this.findByPeriod(startDate, endDate);

    return movimentacoes.reduce((acc, mov) => {
      switch (mov.tipo) {
        case 'entrada':
          acc.entradas += Number(mov.quantidade);
          break;
        case 'saida':
          acc.saidas += Number(mov.quantidade);
          break;
        case 'consumo':
          acc.consumo += Number(mov.quantidade);
          break;
        case 'perda':
          acc.perdas += Number(mov.quantidade);
          break;
        case 'ajuste':
          acc.ajustes += Number(mov.quantidade);
          break;
      }
      return acc;
    }, {
      entradas: 0,
      saidas: 0,
      consumo: 0,
      perdas: 0,
      ajustes: 0,
    });
  }
}
