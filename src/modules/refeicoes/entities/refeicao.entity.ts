import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn
} from 'typeorm';
import { Cardapio } from '../../cardapios/entities/cardapio.entity';
import { RefeicaoItem } from './refeicao-item.entity';

@Entity('refeicoes')
export class Refeicao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'cardapio_id' })
  cardapioId: number;

  @Column({
    type: 'varchar',
    enum: ['cafe', 'almoco', 'lanche', 'jantar']
  })
  tipo: 'cafe' | 'almoco' | 'lanche' | 'jantar';

  @Column('text')
  descricao: string;

  @Column({ name: 'calorias_total', type: 'decimal', precision: 10, scale: 2 })
  caloriasTotal: number;

  @ManyToOne(() => Cardapio, cardapio => cardapio.refeicoes)
  @JoinColumn({ name: 'cardapio_id' })
  cardapio: Cardapio;

  @OneToMany(() => RefeicaoItem, item => item.refeicao)
  itens: RefeicaoItem[];

  constructor(partial: Partial<Refeicao>) {
    Object.assign(this, partial);
  }
}
