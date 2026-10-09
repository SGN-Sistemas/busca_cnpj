import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  name: 'SOCIOS',
  synchronize: false
})
export class SOCIOS {
  @PrimaryGeneratedColumn()
  SOCI_COD: number

  @Column({
    nullable: true
  })
  SOCI_NOME: string

  @Column({
    nullable: true
  })
  SOCI_TIPO: string
}
