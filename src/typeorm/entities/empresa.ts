import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  name: 'EMPRESA',
  synchronize: false
})
export class EMPRESA {
  @PrimaryGeneratedColumn('identity')
  EMPR_COD: number

  @Column({
    nullable: true
  })
  EMPR_RAZAO_SOCIAL: string

  @Column({
    nullable: true
  })
  EMPR_FANTASIA: string

  @Column({
    nullable: true
  })
  EMPR_CNPJ: string

  @Column({
    nullable: true
  })
  EMPR_TIPO: string

  @Column({
    nullable: true
  })
  EMPR_DATA_ABERTURA: string

  @Column({
    nullable: true
  })
  EMPR_TELEFONE: string

  @Column({
    nullable: true
  })
  EMPR_EMAIL: string

  @Column({
    nullable: true
  })
  EMPR_SITUACAO: string

  @Column({
    nullable: true
  })
  EMPR_PORTE: string

  @Column({
    nullable: true
  })
  EMPR_NATUREZA_JURIDICA: string

  @Column({
    nullable: true
  })
  EMPR_ULTIMA_ATUALIZACAO: Date

  @Column({
    nullable: true
  })
  EMPR_ULTIMA_ATUALIZACAO_NOSSA: Date

  @Column({
    nullable: true
  })
  EMPR_STATUS: string

  @Column({
    nullable: true
  })
  EMPR_MOTIVO_SITUACAO: string

  @Column({
    nullable: true
  })
  EMPR_SITUACAO_ESPECIAL: string

  @Column({
    nullable: true
  })
  EMPR_CAPITAL_SOCIAL: string
}
