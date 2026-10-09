import { MigrationInterface, QueryRunner } from 'typeorm'
export class default1672140601419 implements MigrationInterface {
  name = 'default1672140601419'
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "EMPRESA" ("EMPR_COD" int NOT NULL, "EMPR_RAZAO_SOCIAL" nvarchar(255) NOT NULL, "EMPR_FANTASIA" nvarchar(255) NOT NULL, "EMPR_CNPJ" nvarchar(255) NOT NULL, "EMPR_TIPO" nvarchar(255) NOT NULL, "EMPR_DATA_ABERTURA" nvarchar(255) NOT NULL, "EMPR_TELEFONE" nvarchar(255) NOT NULL, "EMPR_EMAIL" nvarchar(255) NOT NULL, "EMPR_SITUACAO" nvarchar(255) NOT NULL, "EMPR_PORTE" nvarchar(255) NOT NULL, "EMPR_NATUREZA_JURIDICA" nvarchar(255) NOT NULL, "EMPR_ULTIMA_ATUALIZACAO" datetime NOT NULL, "EMPR_ULTIMA_ATUALIZACAO_NOSSA" datetime NOT NULL, "EMPR_STATUS" nvarchar(255) NOT NULL, "EMPR_MOTIVO_SITUACAO" nvarchar(255) NOT NULL, "EMPR_SITUACAO_ESPECIAL" nvarchar(255) NOT NULL, "EMPR_CAPITAL_SOCIAL" nvarchar(255) NOT NULL, CONSTRAINT "PK_6c194b2e463cb44421c43a58dc9" PRIMARY KEY ("EMPR_COD"))');
    await queryRunner.query('CREATE TABLE "ATIVIDADE" ("ATIV_COD" int NOT NULL IDENTITY(1,1), "ATIV_DESC" nvarchar(255) NOT NULL, "ATIV_CODIGO" nvarchar(255) NOT NULL, "ATIV_TIPO" nvarchar(255) NOT NULL, CONSTRAINT "PK_9c7df8eb35562c78f62c9b4feaa" PRIMARY KEY ("ATIV_COD"))');
    await queryRunner.query('CREATE TABLE "ENDERECO" ("ENDE_COD" int NOT NULL, "ENDE_COMPLEMENTO" nvarchar(255) NOT NULL, "ENDE_BAIRRO" nvarchar(255) NOT NULL, "ENDE_LOGRADOURO" nvarchar(255) NOT NULL, "ENDE_MUNICIPIO" nvarchar(255) NOT NULL, "ENDE_UF" nvarchar(255) NOT NULL, "ENDE_NUMERO" nvarchar(255) NOT NULL, "ENDE_CEP" nvarchar(255) NOT NULL, "ENDE_EMPR_COD" int NOT NULL, CONSTRAINT "PK_e9556664a9004317b5b4201435f" PRIMARY KEY ("ENDE_COD"))');
    await queryRunner.query('CREATE TABLE "REL_EMPR_ATIV" ("REFA_EMPR_COD" int NOT NULL, "REFA_COD" int NOT NULL, "REFA_ATIV_COD" int NOT NULL, CONSTRAINT "PK_a7643af6a8e5467f11a28179506" PRIMARY KEY ("REFA_COD"))');
    await queryRunner.query('CREATE TABLE "SOCIOS" ("SOCI_COD" int NOT NULL IDENTITY(1,1), "SOCI_NOME" nvarchar(255) NOT NULL, "SOCI_TIPO" nvarchar(255) NOT NULL, CONSTRAINT "PK_ba40cc13fada0daf77eaf2a74b7" PRIMARY KEY ("SOCI_COD"))');
    await queryRunner.query('CREATE TABLE "QUANTIDADE_PESQUISA" ("QUPE_COD" int NOT NULL, "QUPE_ANO" nvarchar(255) NOT NULL, "QUPE_QUANTIDADE" int NOT NULL, "QUPE_EMPR_COD" int NOT NULL, CONSTRAINT "PK_7e243d5da7896dd582c83127511" PRIMARY KEY ("QUPE_COD"))');
    await queryRunner.query('CREATE TABLE "REL_EMPR_SOCI" ("REFS_COD" int NOT NULL IDENTITY(1,1), "REFS_SOCI_COD" int NOT NULL, "REFS_EMPR_COD" int NOT NULL, CONSTRAINT "PK_6fe7059d91582ffb77a46df1fff" PRIMARY KEY ("REFS_COD"))');
  }
  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "REL_EMPR_SOCI"');
    await queryRunner.query('DROP TABLE "QUANTIDADE_PESQUISA"');
    await queryRunner.query('DROP TABLE "SOCIOS"');
    await queryRunner.query('DROP TABLE "REL_EMPR_ATIV"');
    await queryRunner.query('DROP TABLE "ENDERECO"');
    await queryRunner.query('DROP TABLE "ATIVIDADE"');
    await queryRunner.query('DROP TABLE "EMPRESA"');
  }
}
