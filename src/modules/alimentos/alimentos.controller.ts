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
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AlimentosService } from './alimentos.service';
import { CreateAlimentoDto } from './dto/create-alimento.dto';
import { UpdateAlimentoDto } from './dto/update-alimento.dto';
import { Alimento } from './entities/alimento.entity';

@ApiTags('Alimentos')
@ApiBearerAuth()
@Controller('alimentos')
@UseGuards(JwtAuthGuard)
export class AlimentosController {
  constructor(private readonly alimentosService: AlimentosService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo alimento' })
  @ApiResponse({ 
    status: 201, 
    description: 'Alimento criado com sucesso',
    type: Alimento
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() createAlimentoDto: CreateAlimentoDto): Promise<Alimento> {
    return this.alimentosService.create(createAlimentoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os alimentos' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de alimentos retornada com sucesso',
    type: [Alimento]
  })
  findAll(): Promise<Alimento[]> {
    return this.alimentosService.findAll();
  }

  @Get('estatisticas')
  @ApiOperation({ summary: 'Obter estatísticas dos alimentos' })
  @ApiResponse({ 
    status: 200, 
    description: 'Estatísticas dos alimentos',
    schema: {
      type: 'object',
      properties: {
        totalAlimentos: { type: 'number' },
        porCategoria: { type: 'object' },
        custoMedioTotal: { type: 'number' }
      }
    }
  })
  getEstatisticasAlimentos(): Promise<{
    totalAlimentos: number;
    porCategoria: { [key: string]: number };
    custoMedioTotal: number;
  }> {
    return this.alimentosService.getEstatisticasAlimentos();
  }

  @Get('search')
  @ApiOperation({ summary: 'Buscar alimentos por termo' })
  @ApiQuery({ name: 'termo', description: 'Termo de busca', required: true })
  @ApiResponse({ 
    status: 200, 
    description: 'Alimentos encontrados',
    type: [Alimento]
  })
  search(@Query('termo') termo: string): Promise<Alimento[]> {
    return this.alimentosService.search(termo);
  }

  @Get('categoria/:categoriaId')
  @ApiOperation({ summary: 'Buscar alimentos por categoria' })
  @ApiParam({ name: 'categoriaId', description: 'ID da categoria' })
  @ApiResponse({ 
    status: 200, 
    description: 'Alimentos da categoria',
    type: [Alimento]
  })
  findByCategoria(@Param('categoriaId') categoriaId: string): Promise<Alimento[]> {
    return this.alimentosService.findByCategoria(+categoriaId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar alimento por ID' })
  @ApiParam({ name: 'id', description: 'ID do alimento' })
  @ApiResponse({ 
    status: 200, 
    description: 'Alimento encontrado',
    type: Alimento
  })
  @ApiResponse({ status: 404, description: 'Alimento não encontrado' })
  findOne(@Param('id') id: string): Promise<Alimento> {
    return this.alimentosService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar alimento' })
  @ApiParam({ name: 'id', description: 'ID do alimento' })
  @ApiResponse({ 
    status: 200, 
    description: 'Alimento atualizado com sucesso',
    type: Alimento
  })
  @ApiResponse({ status: 404, description: 'Alimento não encontrado' })
  update(
    @Param('id') id: string,
    @Body() updateAlimentoDto: UpdateAlimentoDto,
  ): Promise<Alimento> {
    return this.alimentosService.update(+id, updateAlimentoDto);
  }

  @Put(':id/custo')
  @ApiOperation({ summary: 'Atualizar custo médio do alimento' })
  @ApiParam({ name: 'id', description: 'ID do alimento' })
  @ApiResponse({ 
    status: 200, 
    description: 'Custo médio atualizado com sucesso',
    type: Alimento
  })
  @ApiResponse({ status: 404, description: 'Alimento não encontrado' })
  atualizarCustoMedio(
    @Param('id') id: string,
    @Body('novoCusto') novoCusto: number,
  ): Promise<Alimento> {
    return this.alimentosService.atualizarCustoMedio(+id, novoCusto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover alimento' })
  @ApiParam({ name: 'id', description: 'ID do alimento' })
  @ApiResponse({ status: 204, description: 'Alimento removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Alimento não encontrado' })
  remove(@Param('id') id: string): Promise<void> {
    return this.alimentosService.remove(+id);
  }
}
