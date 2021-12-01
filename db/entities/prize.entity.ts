import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Affiliation } from './affiliation.entity'
import { Prize as PrizeType } from '../types'
import { Laureate } from '.'

@Entity()
export class Prize implements PrizeType {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column()
  public category!: string

  @Column('text')
  public motivation!: string

  @Column('int')
  public share!: number

  @Column('int')
  public year!: number

  @ManyToOne(() => Laureate, (laureate) => laureate.prizes, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  public laureate!: Laureate

  @ManyToMany(() => Affiliation)
  @JoinTable()
  public affiliations!: Affiliation[]
}
