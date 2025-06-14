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
import { Categoria } from '../../categorias/entities/categoria.entity';
import { Estoque } from '../../estoque/entities/estoque.entity';
import { RefeicaoItem } from '../../refeicoes/entities/refeicao-item.entity';
import { Movimentacao } from '../../movimentacoes/entities/movimentacao.entity';

@Entity('alimentos')
export class Alimento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ name: 'categoria_id' })
  categoriaId: number;

  @Column({ name: 'unidade_medida' })
  unidadeMedida: string;

  @Column({ name: 'calorias_por_unidade', type: 'decimal', precision: 10, scale: 2 })
  caloriasPorUnidade: number;

  @Column({ name: 'custo_medio', type: 'decimal', precision: 10, scale: 2 })
  custoMedio: number;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;

  @ManyToOne(() => Categoria, categoria => categoria.alimentos)
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;

  @OneToMany(() => Estoque, estoque => estoque.alimento)
  itensEstoque: Estoque[];

  @OneToMany(() => RefeicaoItem, refeicaoItem => refeicaoItem.alimento)
  itensRefeicao: RefeicaoItem[];

  @OneToMany(() => Movimentacao, movimentacao => movimentacao.alimento)
  movimentacoes: Movimentacao[];

  constructor(partial: Partial<Alimento>) {
    Object.assign(this, partial);
  }
}
