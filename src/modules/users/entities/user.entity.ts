import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Cardapio } from '../../cardapios/entities/cardapio.entity';
import { Movimentacao } from '../../movimentacoes/entities/movimentacao.entity';

export type UserType = 'admin' | 'nutricionista' | 'estoquista';

@Entity('usuarios')
export class User {
  @ApiProperty({ description: 'ID único do usuário' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Nome completo do usuário' })
  @Column()
  nome: string;

  @ApiProperty({ description: 'Email único do usuário' })
  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  senha_hash: string;

  @ApiProperty({ 
    description: 'Tipo de usuário',
    enum: ['admin', 'nutricionista', 'estoquista']
  })
  @Column({
    type: 'varchar',
    enum: ['admin', 'nutricionista', 'estoquista']
  })
  tipo: UserType;

  @ApiProperty({ description: 'Data de criação do usuário' })
  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @ApiProperty({ description: 'Data da última atualização' })
  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;

  @OneToMany(() => Cardapio, cardapio => cardapio.criadoPor)
  cardapios: Cardapio[];

  @OneToMany(() => Movimentacao, movimentacao => movimentacao.usuario)
  movimentacoes: Movimentacao[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
