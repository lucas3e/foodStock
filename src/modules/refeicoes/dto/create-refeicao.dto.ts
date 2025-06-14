import { IsNotEmpty, IsNumber, IsString, IsEnum, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRefeicaoItemDto {
  @IsNumber()
  @IsNotEmpty()
  alimentoId: number;

  @IsNumber()
  @IsNotEmpty()
  quantidade: number;
}

export class CreateRefeicaoDto {
  @IsEnum(['cafe', 'almoco', 'lanche', 'jantar'])
  @IsNotEmpty()
  tipo: 'cafe' | 'almoco' | 'lanche' | 'jantar';

  @IsNumber()
  @IsNotEmpty()
  cardapioId: number;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsArray()
  @Type(() => CreateRefeicaoItemDto)
  itens: CreateRefeicaoItemDto[];
}
