import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum ExpenseCategory {
  PENDING = 'pending',
  REVIEWED = 'reviewed',
  VOIDED = 'voided',
}

@Entity()
export class ExpenseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column()
  amount!: number;
  @Column()
  category!: string;
  @Column()
  description!: string;
  @Column({ type: 'enum', enum: ExpenseCategory, default: ExpenseCategory.PENDING })
  status!: ExpenseCategory;
  @Column()
  date!: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
  @Column({ type: 'timestamp', default: () => 'UPDATE_AT', onUpdate: 'UPDATE_TIMESTAMP' })
  updatedAt!: Date;
}
