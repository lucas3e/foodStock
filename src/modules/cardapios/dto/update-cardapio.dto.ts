import { PartialType } from '@nestjs/mapped-types';
import { CreateCardapioDto } from './create-cardapio.dto';

export class UpdateCardapioDto extends PartialType(CreateCardapioDto) {}
