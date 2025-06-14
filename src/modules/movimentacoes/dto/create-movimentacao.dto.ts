import { IsNotEmpty, IsNumber, IsString, IsEnum, IsOptional } from 'class-validator';

export class CreateMovimentacaoDto {
  @IsEnum(['entrada', 'saida', 'ajuste', 'consumo', 'perda'])
  @IsNotEmpty()
  tipo: 'entrada' | 'saida' | 'ajuste' | 'consumo' | 'perda';

  @IsNumber()
  @IsNotEmpty()
  alimentoId: number;

  @IsNumber()
  @IsNotEmpty()
  quantidade: number;

  @IsNumber()
  @IsOptional()
  estoqueId?: number;

  @IsNumber()
  @IsOptional()
  cardapioId?: number;

  @IsNumber()
  @IsNotEmpty()
  usuarioId: number;

  @IsString()
  @IsOptional()
  motivo?: string;
}
