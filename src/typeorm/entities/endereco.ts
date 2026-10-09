import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  name: 'ENDERECO',
  synchronize: false
})
export class ENDERECO {
  @PrimaryGeneratedColumn('identity')
  ENDE_COD: number

  @Column({
    nullable: true
  })
  ENDE_COMPLEMENTO: string

  @Column({
    nullable: true
  })
  ENDE_BAIRRO: string

  @Column({
    nullable: true
  })
  ENDE_LOGRADOURO: string

  @Column({
    nullable: true
  })
  ENDE_MUNICIPIO: string

  @Column({
    nullable: true
  })
  ENDE_UF: string

  @Column({
    nullable: true
  })
  ENDE_NUMERO: string

  @Column({
    nullable: true
  })
  ENDE_CEP: string

  @Column({
    nullable: true
  })
  ENDE_EMPR_COD: number
}
