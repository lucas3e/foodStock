import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateAlimentoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsString()
  @IsNotEmpty()
  unidadeMedida: string;

  @IsNumber()
  @IsOptional()
  caloriasPorUnidade?: number;

  @IsNumber()
  @IsOptional()
  custoMedio?: number;

  @IsNumber()
  @IsNotEmpty()
  categoriaId: number;
}
