import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estoque } from './entities/estoque.entity';
import { CreateEstoqueDto } from './dto/create-estoque.dto';
import { UpdateEstoqueDto } from './dto/update-estoque.dto';

@Injectable()
export class EstoqueService {
  constructor(
    @InjectRepository(Estoque)
    private readonly estoqueRepository: Repository<Estoque>,
  ) {}

  async create(createEstoqueDto: CreateEstoqueDto): Promise<Estoque> {
    const estoque = this.estoqueRepository.create(createEstoqueDto);
    return this.estoqueRepository.save(estoque);
  }

  async findAll(): Promise<Estoque[]> {
    return this.estoqueRepository.find({
      relations: ['alimento', 'alimento.categoria'],
    });
  }

  async findOne(id: number): Promise<Estoque> {
    const estoque = await this.estoqueRepository.findOne({
      where: { id },
      relations: ['alimento', 'alimento.categoria'],
    });

    if (!estoque) {
      throw new NotFoundException(`Item de estoque com ID ${id} não encontrado`);
    }

    return estoque;
  }

  async findByAlimento(alimentoId: number): Promise<Estoque[]> {
    return this.estoqueRepository.find({
      where: { alimentoId },
      relations: ['alimento'],
    });
  }

  async findByStatus(status: string): Promise<Estoque[]> {
    return this.estoqueRepository.find({
      where: { status: status as any },
      relations: ['alimento', 'alimento.categoria'],
    });
  }

  async update(id: number, updateEstoqueDto: UpdateEstoqueDto): Promise<Estoque> {
    await this.findOne(id);
    await this.estoqueRepository.update(id, updateEstoqueDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const estoque = await this.findOne(id);
    await this.estoqueRepository.remove(estoque);
  }

  async getEstoqueDisponivel(): Promise<Estoque[]> {
    return this.estoqueRepository.find({
      where: { status: 'disponivel' },
      relations: ['alimento', 'alimento.categoria'],
    });
  }

  async getItensVencendo(dias: number = 7): Promise<Estoque[]> {
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() + dias);

    return this.estoqueRepository
      .createQueryBuilder('estoque')
      .leftJoinAndSelect('estoque.alimento', 'alimento')
      .leftJoinAndSelect('alimento.categoria', 'categoria')
      .where('estoque.dataValidade <= :dataLimite', { dataLimite })
      .andWhere('estoque.status = :status', { status: 'disponivel' })
      .getMany();
  }
}
