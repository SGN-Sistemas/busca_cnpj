import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  name: 'REL_EMPR_SOCI',
  synchronize: false
})
export class REL_EMPR_SOCI {
  @PrimaryGeneratedColumn()
  REFS_COD: number

  @Column({
    nullable: true
  })
  REFS_SOCI_COD: number

  @Column({
    nullable: true
  })
  REFS_EMPR_COD: number
}
