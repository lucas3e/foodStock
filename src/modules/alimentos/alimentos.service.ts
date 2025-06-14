import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Alimento } from './entities/alimento.entity';
import { CreateAlimentoDto } from './dto/create-alimento.dto';
import { UpdateAlimentoDto } from './dto/update-alimento.dto';

@Injectable()
export class AlimentosService {
  constructor(
    @InjectRepository(Alimento)
    private readonly alimentoRepository: Repository<Alimento>,
  ) {}

  async create(createAlimentoDto: CreateAlimentoDto): Promise<Alimento> {
    const alimento = this.alimentoRepository.create(createAlimentoDto);
    return this.alimentoRepository.save(alimento);
  }

  async findAll(): Promise<Alimento[]> {
    return this.alimentoRepository.find({
      relations: ['categoria'],
      order: { nome: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Alimento> {
    const alimento = await this.alimentoRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });

    if (!alimento) {
      throw new NotFoundException(`Alimento com ID ${id} não encontrado`);
    }

    return alimento;
  }

  async findByCategoria(categoriaId: number): Promise<Alimento[]> {
    return this.alimentoRepository.find({
      where: { categoriaId },
      relations: ['categoria'],
      order: { nome: 'ASC' },
    });
  }

  async search(termo: string): Promise<Alimento[]> {
    return this.alimentoRepository.find({
      where: { nome: Like(`%${termo}%`) },
      relations: ['categoria'],
      order: { nome: 'ASC' },
    });
  }

  async update(id: number, updateAlimentoDto: UpdateAlimentoDto): Promise<Alimento> {
    const alimento = await this.findOne(id);
    await this.alimentoRepository.update(id, updateAlimentoDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const alimento = await this.findOne(id);
    await this.alimentoRepository.remove(alimento);
  }

  async atualizarCustoMedio(id: number, novoCusto: number): Promise<Alimento> {
    const alimento = await this.findOne(id);
    
    // Implementar lógica de média ponderada se necessário
    alimento.custoMedio = novoCusto;
    
    return this.alimentoRepository.save(alimento);
  }

  async getEstatisticasAlimentos(): Promise<{
    totalAlimentos: number;
    porCategoria: { [key: string]: number };
    custoMedioTotal: number;
  }> {
    const alimentos = await this.findAll();

    const estatisticas = {
      totalAlimentos: alimentos.length,
      porCategoria: {} as { [key: string]: number },
      custoMedioTotal: 0,
    };

    let custoTotal = 0;
    let alimentosComCusto = 0;

    alimentos.forEach(alimento => {
      // Contagem por categoria
      const categoriaName = alimento.categoria.nome;
      if (!estatisticas.porCategoria[categoriaName]) {
        estatisticas.porCategoria[categoriaName] = 0;
      }
      estatisticas.porCategoria[categoriaName]++;

      // Cálculo do custo médio total
      if (alimento.custoMedio) {
        custoTotal += alimento.custoMedio;
        alimentosComCusto++;
      }
    });

    estatisticas.custoMedioTotal = alimentosComCusto > 0 
      ? Number((custoTotal / alimentosComCusto).toFixed(2))
      : 0;

    return estatisticas;
  }
}
