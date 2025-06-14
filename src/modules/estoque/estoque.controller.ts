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
import { EstoqueService } from './estoque.service';
import { CreateEstoqueDto } from './dto/create-estoque.dto';
import { UpdateEstoqueDto } from './dto/update-estoque.dto';
import { Estoque } from './entities/estoque.entity';

@Controller('estoque')
@UseGuards(JwtAuthGuard)
export class EstoqueController {
  constructor(private readonly estoqueService: EstoqueService) {}

  @Post()
  create(@Body() createEstoqueDto: CreateEstoqueDto): Promise<Estoque> {
    return this.estoqueService.create(createEstoqueDto);
  }

  @Get()
  findAll(): Promise<Estoque[]> {
    return this.estoqueService.findAll();
  }

  @Get('disponivel')
  getEstoqueDisponivel(): Promise<Estoque[]> {
    return this.estoqueService.getEstoqueDisponivel();
  }

  @Get('vencendo')
  getItensVencendo(@Query('dias') dias: number): Promise<Estoque[]> {
    return this.estoqueService.getItensVencendo(dias);
  }

  @Get('alimento/:alimentoId')
  findByAlimento(@Param('alimentoId') alimentoId: string): Promise<Estoque[]> {
    return this.estoqueService.findByAlimento(+alimentoId);
  }

  @Get('status/:status')
  findByStatus(@Param('status') status: string): Promise<Estoque[]> {
    return this.estoqueService.findByStatus(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Estoque> {
    return this.estoqueService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateEstoqueDto: UpdateEstoqueDto,
  ): Promise<Estoque> {
    return this.estoqueService.update(+id, updateEstoqueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.estoqueService.remove(+id);
  }
}
