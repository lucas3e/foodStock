import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn
} from 'typeorm';
import { Alimento } from '../../alimentos/entities/alimento.entity';
import { Movimentacao } from '../../movimentacoes/entities/movimentacao.entity';

@Entity('estoque')
export class Estoque {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'alimento_id' })
  alimentoId: number;

  @Column({ type: 'decimal', precision: 10, scale: 3 })
  quantidade: number;

  @Column()
  lote: string;

  @Column({ name: 'data_validade', type: 'date' })
  dataValidade: Date;

  @Column({ name: 'data_entrada', type: 'date' })
  dataEntrada: Date;

  @Column()
  origem: string;

  @Column({ name: 'custo_unitario', type: 'decimal', precision: 10, scale: 2 })
  custoUnitario: number;

  @Column()
  localizacao: string;

  @Column({
    type: 'varchar',
    enum: ['disponivel', 'reservado', 'vencido', 'consumido']
  })
  status: 'disponivel' | 'reservado' | 'vencido' | 'consumido';

  @ManyToOne(() => Alimento, alimento => alimento.itensEstoque)
  @JoinColumn({ name: 'alimento_id' })
  alimento: Alimento;

  @OneToMany(() => Movimentacao, movimentacao => movimentacao.estoque)
  movimentacoes: Movimentacao[];

  constructor(partial: Partial<Estoque>) {
    Object.assign(this, partial);
  }
}
