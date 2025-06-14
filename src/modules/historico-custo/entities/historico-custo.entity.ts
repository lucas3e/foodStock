import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column
} from 'typeorm';

@Entity('historico_custo')
export class HistoricoCusto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'mes_ano' })
  mesAno: string; // Formato: "YYYY-MM"

  @Column({ name: 'custo_total', type: 'decimal', precision: 12, scale: 2 })
  custoTotal: number;

  @Column({ name: 'alimentos_consumidos' })
  alimentosConsumidos: number;

  constructor(partial: Partial<HistoricoCusto>) {
    Object.assign(this, partial);
  }
}
