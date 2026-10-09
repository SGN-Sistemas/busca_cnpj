import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  name: 'ATIVIDADE',
  synchronize: false
})
export class ATIVIDADE {
  @PrimaryGeneratedColumn()
  ATIV_COD: number

  @Column({
    nullable: true
  })
  ATIV_DESC: string

  @Column({
    nullable: true
  })
  ATIV_CODIGO: string

  @Column({
    nullable: true
  })
  ATIV_TIPO: string
}
