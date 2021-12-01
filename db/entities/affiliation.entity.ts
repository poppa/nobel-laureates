import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Prize } from '.'
import { Affiliation as AffiliationType } from '../types'

@Entity()
export class Affiliation implements AffiliationType {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column()
  public name!: string

  @Column({ nullable: true })
  public city?: string

  @Column({ nullable: true })
  public country?: string
}
