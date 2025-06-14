import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Refeicao } from '../../refeicoes/entities/refeicao.entity';
import { Movimentacao } from '../../movimentacoes/entities/movimentacao.entity';

@Entity('cardapios')
export class Cardapio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  data: Date;

  @Column({ name: 'criado_por' })
  criadoPorId: number;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;

  @ManyToOne(() => User, user => user.cardapios)
  @JoinColumn({ name: 'criado_por' })
  criadoPor: User;

  @OneToMany(() => Refeicao, refeicao => refeicao.cardapio)
  refeicoes: Refeicao[];

  @OneToMany(() => Movimentacao, movimentacao => movimentacao.cardapio)
  movimentacoes: Movimentacao[];

  constructor(partial: Partial<Cardapio>) {
    Object.assign(this, partial);
  }
}
