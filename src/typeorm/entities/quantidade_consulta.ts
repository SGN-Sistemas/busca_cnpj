import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  name: 'QUANTIDADE_PESQUISA',
  synchronize: false
})
export class QUANTIDADE_PESQUISA {
  @PrimaryGeneratedColumn('identity')
  QUPE_COD: number

  @Column({
    nullable: true
  })
  QUPE_ANO_MES: string

  @Column({
    nullable: true
  })
  QUPE_QUANTIDADE: number

  @Column({
    nullable: true
  })
  QUPE_EMPR_COD: number
}
