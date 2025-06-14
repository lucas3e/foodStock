import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Refeicao } from './refeicao.entity';
import { Alimento } from '../../alimentos/entities/alimento.entity';

@Entity('refeicao_itens')
export class RefeicaoItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'refeicao_id' })
  refeicaoId: number;

  @Column({ name: 'alimento_id' })
  alimentoId: number;

  @Column({ type: 'decimal', precision: 10, scale: 3 })
  quantidade: number;

  @Column('text', { nullable: true })
  observacoes: string;

  @ManyToOne(() => Refeicao, refeicao => refeicao.itens)
  @JoinColumn({ name: 'refeicao_id' })
  refeicao: Refeicao;

  @ManyToOne(() => Alimento, alimento => alimento.itensRefeicao)
  @JoinColumn({ name: 'alimento_id' })
  alimento: Alimento;

  constructor(partial: Partial<RefeicaoItem>) {
    Object.assign(this, partial);
  }
}
