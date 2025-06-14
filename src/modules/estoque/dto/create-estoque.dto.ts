import { IsNotEmpty, IsNumber, IsString, IsDate, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEstoqueDto {
  @IsNumber()
  @IsNotEmpty()
  alimentoId: number;

  @IsNumber()
  @IsNotEmpty()
  quantidade: number;

  @IsString()
  @IsNotEmpty()
  lote: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  dataValidade: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  dataEntrada: Date;

  @IsString()
  @IsNotEmpty()
  origem: string;

  @IsNumber()
  @IsNotEmpty()
  custoUnitario: number;

  @IsString()
  @IsNotEmpty()
  localizacao: string;

  @IsEnum(['disponivel', 'reservado', 'vencido', 'consumido'])
  @IsNotEmpty()
  status: 'disponivel' | 'reservado' | 'vencido' | 'consumido';
}
