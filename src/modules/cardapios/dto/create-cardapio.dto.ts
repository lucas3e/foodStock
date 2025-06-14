import { IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCardapioDto {
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  data: Date;

  @IsNumber()
  @IsNotEmpty()
  criadoPor: number;
}
