import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { Gender, Laureate as LaureateType } from '../types'
import { Prize } from './prize.entity'

@Entity()
export class Laureate implements LaureateType {
  @PrimaryColumn()
  public id!: number

  @Column({ nullable: false })
  public firstname!: string

  @Column({ nullable: true })
  public surname?: string

  @Column({ nullable: true })
  public born?: string

  @Column({ nullable: true })
  public bornCity?: string

  @Column({ nullable: true })
  public bornCountry?: string

  @Column({ nullable: true })
  public bornCountryCode?: string

  @Column({ nullable: true })
  public died?: string

  @Column({ nullable: true })
  public diedCity?: string

  @Column({ nullable: true })
  public diedCountry?: string

  @Column({ nullable: true })
  public diedCountryCode?: string

  @Column()
  public gender!: Gender

  @OneToMany(() => Prize, (p) => p.laureate)
  public prizes!: Prize[]
}
