import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Cardapio } from './entities/cardapio.entity';
import { CreateCardapioDto } from './dto/create-cardapio.dto';
import { UpdateCardapioDto } from './dto/update-cardapio.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class CardapiosService {
  constructor(
    @InjectRepository(Cardapio)
    private readonly cardapioRepository: Repository<Cardapio>,
    private readonly usersService: UsersService,
  ) {}

  async create(createCardapioDto: CreateCardapioDto): Promise<Cardapio> {
    // Verifica se o usuário existe
    await this.usersService.findOne(createCardapioDto.criadoPor);
    
    const cardapio = this.cardapioRepository.create({
      data: createCardapioDto.data,
      criadoPorId: createCardapioDto.criadoPor,
    });
    return this.cardapioRepository.save(cardapio);
  }

  async findAll(): Promise<Cardapio[]> {
    return this.cardapioRepository.find({
      relations: ['criadoPor', 'refeicoes', 'refeicoes.itens', 'refeicoes.itens.alimento'],
      order: { data: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Cardapio> {
    const cardapio = await this.cardapioRepository.findOne({
      where: { id },
      relations: ['criadoPor', 'refeicoes', 'refeicoes.itens', 'refeicoes.itens.alimento'],
    });

    if (!cardapio) {
      throw new NotFoundException(`Cardápio com ID ${id} não encontrado`);
    }

    return cardapio;
  }

  async findByPeriod(startDate: Date, endDate: Date): Promise<Cardapio[]> {
    return this.cardapioRepository.find({
      where: {
        data: Between(startDate, endDate),
      },
      relations: ['criadoPor', 'refeicoes', 'refeicoes.itens', 'refeicoes.itens.alimento'],
      order: { data: 'ASC' },
    });
  }

  async update(id: number, updateCardapioDto: UpdateCardapioDto): Promise<Cardapio> {
    const cardapio = await this.findOne(id);
    
    if (updateCardapioDto.criadoPor) {
      await this.usersService.findOne(updateCardapioDto.criadoPor);
    }

    const updateData: any = {};
    if (updateCardapioDto.data) updateData.data = updateCardapioDto.data;
    if (updateCardapioDto.criadoPor) updateData.criadoPorId = updateCardapioDto.criadoPor;

    await this.cardapioRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const cardapio = await this.findOne(id);
    await this.cardapioRepository.remove(cardapio);
  }

  async getCardapiosSemana(): Promise<Cardapio[]> {
    const hoje = new Date();
    const inicioSemana = new Date(hoje);
    inicioSemana.setDate(hoje.getDate() - hoje.getDay());
    
    const fimSemana = new Date(hoje);
    fimSemana.setDate(inicioSemana.getDate() + 6);

    return this.findByPeriod(inicioSemana, fimSemana);
  }
}
