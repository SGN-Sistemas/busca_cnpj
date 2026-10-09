import { MigrationInterface, QueryRunner } from 'typeorm'
export class default1672144645383 implements MigrationInterface {
  name = 'default1672144645383'
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        SELECT 
            ATIV_COD,
            ATIV_DESC,
            ATIV_CODIGO,
            ATIV_TIPO
        FROM
            ATIVIDADE
    `);
    await queryRunner.query(`
        SELECT 
            EMPR_COD,
            EMPR_RAZAO_SOCIAL,
            EMPR_FANTASIA,
            EMPR_CNPJ,
            EMPR_TIPO,
            EMPR_DATA_ABERTURA,
            EMPR_TELEFONE,
            EMPR_EMAIL,
            EMPR_SITUACAO,
            EMPR_PORTE,
            EMPR_NATUREZA_JURIDICA,
            EMPR_ULTIMA_ATUALIZACAO,
            EMPR_ULTIMA_ATUALIZACAO_NOSSA,
            EMPR_STATUS,
            EMPR_MOTIVO_SITUACAO,
            EMPR_SITUACAO_ESPECIAL,
            EMPR_CAPITAL_SOCIAL
        FROM
            EMPRESA
    `);
    await queryRunner.query(`
        SELECT 
            ENDE_COD,
            ENDE_COMPLEMENTO,
            ENDE_BAIRRO,
            ENDE_LOGRADOURO,
            ENDE_MUNICIPIO,
            ENDE_UF,
            ENDE_NUMERO,
            ENDE_CEP,
            ENDE_EMPR_COD
        FROM 
            ENDERECO
    `);
    await queryRunner.query(`
        SELECT 
            QUPE_COD,
            QUPE_ANO_MES,
            QUPE_QUANTIDADE,
            QUPE_EMPR_COD
        FROM 
            QUANTIDADE_PESQUISA
    `);
    await queryRunner.query(`
        SELECT 
            REFA_COD,
            REFA_EMPR_COD,
            REFA_ATIV_COD
        FROM 
            REL_EMPR_ATIV
    `);
    await queryRunner.query(`
        SELECT 
            REFA_COD,
            REFA_EMPR_COD,
            REFA_ATIV_COD
        FROM 
            REL_EMPR_ATIV
    `);
    await queryRunner.query(`
        SELECT 
            REFS_COD,
            REFS_SOCI_COD,
            REFS_EMPR_COD
        FROM 
            REL_EMPR_SOCI
    `);
    await queryRunner.query(`
        SELECT 
            SOCI_COD,
            SOCI_NOME,
            SOCI_TIPO
        FROM 
            SOCIOS
    `);
  }
  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('USE BDCONSULTA_EMPRESA');
  }
}
