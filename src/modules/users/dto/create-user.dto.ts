import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João Silva'
  })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({
    description: 'Email único do usuário',
    example: 'joao@escola.com'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário (mínimo 6 caracteres)',
    example: 'senha123',
    minLength: 6
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  senha: string;

  @ApiProperty({
    description: 'Tipo de usuário no sistema',
    enum: ['admin', 'nutricionista', 'estoquista'],
    example: 'nutricionista'
  })
  @IsEnum(['admin', 'nutricionista', 'estoquista'])
  @IsNotEmpty()
  tipo: 'admin' | 'nutricionista' | 'estoquista';
}
