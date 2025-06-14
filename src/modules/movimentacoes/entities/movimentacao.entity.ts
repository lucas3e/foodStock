import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Alimento } from '../../alimentos/entities/alimento.entity';
import { Estoque } from '../../estoque/entities/estoque.entity';
import { Cardapio } from '../../cardapios/entities/cardapio.entity';

@Entity('movimentacoes')
export class Movimentacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    enum: ['entrada', 'saida', 'ajuste', 'consumo', 'perda']
  })
  tipo: 'entrada' | 'saida' | 'ajuste' | 'consumo' | 'perda';

  @Column({ name: 'alimento_id' })
  alimentoId: number;

  @Column({ type: 'decimal', precision: 10, scale: 3 })
  quantidade: number;

  @Column({ name: 'estoque_id', nullable: true })
  estoqueId: number;

  @Column({ name: 'cardapio_id', nullable: true })
  cardapioId: number;

  @Column({ name: 'usuario_id' })
  usuarioId: number;

  @CreateDateColumn({ name: 'data' })
  data: Date;

  @Column('text', { nullable: true })
  motivo: string;

  @ManyToOne(() => User, user => user.movimentacoes)
  @JoinColumn({ name: 'usuario_id' })
  usuario: User;

  @ManyToOne(() => Alimento, alimento => alimento.movimentacoes)
  @JoinColumn({ name: 'alimento_id' })
  alimento: Alimento;

  @ManyToOne(() => Estoque, estoque => estoque.movimentacoes)
  @JoinColumn({ name: 'estoque_id' })
  estoque: Estoque;

  @ManyToOne(() => Cardapio, cardapio => cardapio.movimentacoes)
  @JoinColumn({ name: 'cardapio_id' })
  cardapio: Cardapio;

  constructor(partial: Partial<Movimentacao>) {
    Object.assign(this, partial);
  }
}
