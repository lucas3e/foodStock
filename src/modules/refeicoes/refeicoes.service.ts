import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Refeicao } from './entities/refeicao.entity';
import { RefeicaoItem } from './entities/refeicao-item.entity';
import { CreateRefeicaoDto } from './dto/create-refeicao.dto';
import { UpdateRefeicaoDto } from './dto/update-refeicao.dto';

@Injectable()
export class RefeicoesService {
  constructor(
    @InjectRepository(Refeicao)
    private readonly refeicaoRepository: Repository<Refeicao>,
    @InjectRepository(RefeicaoItem)
    private readonly refeicaoItemRepository: Repository<RefeicaoItem>,
  ) {}

  async create(createRefeicaoDto: CreateRefeicaoDto): Promise<Refeicao> {
    // Criar a refeição
    const refeicao = this.refeicaoRepository.create({
      tipo: createRefeicaoDto.tipo,
      cardapioId: createRefeicaoDto.cardapioId,
      descricao: createRefeicaoDto.descricao,
    });

    const savedRefeicao = await this.refeicaoRepository.save(refeicao);

    // Criar os itens da refeição
    if (createRefeicaoDto.itens && createRefeicaoDto.itens.length > 0) {
      const itens = createRefeicaoDto.itens.map(item => 
        this.refeicaoItemRepository.create({
          refeicaoId: savedRefeicao.id,
          alimentoId: item.alimentoId,
          quantidade: item.quantidade,
        })
      );

      await this.refeicaoItemRepository.save(itens);
    }

    return this.findOne(savedRefeicao.id);
  }

  async findAll(): Promise<Refeicao[]> {
    return this.refeicaoRepository.find({
      relations: ['cardapio', 'itens', 'itens.alimento', 'itens.alimento.categoria'],
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Refeicao> {
    const refeicao = await this.refeicaoRepository.findOne({
      where: { id },
      relations: ['cardapio', 'itens', 'itens.alimento', 'itens.alimento.categoria'],
    });

    if (!refeicao) {
      throw new NotFoundException(`Refeição com ID ${id} não encontrada`);
    }

    return refeicao;
  }

  async findByCardapio(cardapioId: number): Promise<Refeicao[]> {
    return this.refeicaoRepository.find({
      where: { cardapioId },
      relations: ['itens', 'itens.alimento', 'itens.alimento.categoria'],
      order: { tipo: 'ASC' },
    });
  }

  async findByTipo(tipo: string): Promise<Refeicao[]> {
    return this.refeicaoRepository.find({
      where: { tipo: tipo as any },
      relations: ['cardapio', 'itens', 'itens.alimento', 'itens.alimento.categoria'],
      order: { id: 'DESC' },
    });
  }

  async update(id: number, updateRefeicaoDto: UpdateRefeicaoDto): Promise<Refeicao> {
    const refeicao = await this.findOne(id);

    // Atualizar dados básicos da refeição
    const updateData: any = {};
    if (updateRefeicaoDto.tipo) updateData.tipo = updateRefeicaoDto.tipo;
    if (updateRefeicaoDto.descricao) updateData.descricao = updateRefeicaoDto.descricao;
    if (updateRefeicaoDto.cardapioId) updateData.cardapioId = updateRefeicaoDto.cardapioId;

    if (Object.keys(updateData).length > 0) {
      await this.refeicaoRepository.update(id, updateData);
    }

    // Se há novos itens, remover os antigos e criar os novos
    if (updateRefeicaoDto.itens) {
      // Remover itens existentes
      await this.refeicaoItemRepository.delete({ refeicaoId: id });

      // Criar novos itens
      if (updateRefeicaoDto.itens.length > 0) {
        const novosItens = updateRefeicaoDto.itens.map(item => 
          this.refeicaoItemRepository.create({
            refeicaoId: id,
            alimentoId: item.alimentoId,
            quantidade: item.quantidade,
          })
        );

        await this.refeicaoItemRepository.save(novosItens);
      }
    }

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const refeicao = await this.findOne(id);
    
    // Remover itens da refeição primeiro
    await this.refeicaoItemRepository.delete({ refeicaoId: id });
    
    // Remover a refeição
    await this.refeicaoRepository.remove(refeicao);
  }

  async calcularCaloriasTotais(refeicaoId: number): Promise<number> {
    const refeicao = await this.findOne(refeicaoId);
    
    return refeicao.itens.reduce((total, item) => {
      const caloriasPorUnidade = item.alimento.caloriasPorUnidade || 0;
      return total + (caloriasPorUnidade * Number(item.quantidade));
    }, 0);
  }

  async getEstatisticasRefeicoes(): Promise<{
    totalRefeicoes: number;
    porTipo: { [key: string]: number };
    caloriasMedias: { [key: string]: number };
  }> {
    const refeicoes = await this.findAll();

    const estatisticas = {
      totalRefeicoes: refeicoes.length,
      porTipo: {} as { [key: string]: number },
      caloriasMedias: {} as { [key: string]: number },
    };

    // Contar por tipo e calcular calorias médias
    const tipoStats: { [key: string]: { count: number; totalCalorias: number } } = {};

    for (const refeicao of refeicoes) {
      const tipo = refeicao.tipo;
      
      if (!tipoStats[tipo]) {
        tipoStats[tipo] = { count: 0, totalCalorias: 0 };
      }

      tipoStats[tipo].count++;
      
      const calorias = refeicao.itens.reduce((total, item) => {
        const caloriasPorUnidade = item.alimento.caloriasPorUnidade || 0;
        return total + (caloriasPorUnidade * Number(item.quantidade));
      }, 0);

      tipoStats[tipo].totalCalorias += calorias;
    }

    // Processar estatísticas finais
    Object.keys(tipoStats).forEach(tipo => {
      estatisticas.porTipo[tipo] = tipoStats[tipo].count;
      estatisticas.caloriasMedias[tipo] = tipoStats[tipo].count > 0 
        ? Math.round(tipoStats[tipo].totalCalorias / tipoStats[tipo].count)
        : 0;
    });

    return estatisticas;
  }
}
