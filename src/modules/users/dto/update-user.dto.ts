import { PartialType, OmitType } from '@nestjs/mapped-types';
import { IsOptional, IsString, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['senha'] as const),
) {
  @IsString()
  @IsOptional()
  @MinLength(6)
  senha?: string;
}
