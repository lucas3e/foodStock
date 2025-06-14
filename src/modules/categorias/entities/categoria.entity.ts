import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column,
  OneToMany
} from 'typeorm';
import { Alimento } from '../../alimentos/entities/alimento.entity';

@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column('text')
  descricao: string;

  @OneToMany(() => Alimento, alimento => alimento.categoria)
  alimentos: Alimento[];

  constructor(partial: Partial<Categoria>) {
    Object.assign(this, partial);
  }
}
