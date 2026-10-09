import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  name: 'REL_EMPR_ATIV',
  synchronize: false
})
export class REL_EMPR_ATIV {
  @Column({
    nullable: true
  })
  REFA_EMPR_COD: number

  @PrimaryGeneratedColumn('identity')
  REFA_COD: number

  @Column({
    nullable: true
  })
  REFA_ATIV_COD: number
}
