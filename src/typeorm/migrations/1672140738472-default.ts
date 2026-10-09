import { MigrationInterface, QueryRunner } from 'typeorm'
export class default1672140738472 implements MigrationInterface {
  name = 'default1672140738472'
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "QUANTIDADE_PESQUISA" DROP COLUMN "QUPE_EMPR_COD"');
    await queryRunner.query('ALTER TABLE "ENDERECO" DROP COLUMN "ENDE_EMPR_COD"');
    await queryRunner.query('ALTER TABLE "REL_EMPR_ATIV" DROP COLUMN "REFA_EMPR_COD"');
    await queryRunner.query('ALTER TABLE "REL_EMPR_ATIV" DROP COLUMN "REFA_ATIV_COD"');
    await queryRunner.query('ALTER TABLE "REL_EMPR_SOCI" DROP COLUMN "REFS_SOCI_COD"');
    await queryRunner.query('ALTER TABLE "REL_EMPR_SOCI" DROP COLUMN "REFS_EMPR_COD"');
    await queryRunner.query('ALTER TABLE "EMPRESA" DROP CONSTRAINT "PK_6c194b2e463cb44421c43a58dc9"');
    await queryRunner.query('ALTER TABLE "EMPRESA" DROP COLUMN "EMPR_COD"');
    await queryRunner.query('ALTER TABLE "EMPRESA" ADD "EMPR_COD" int NOT NULL');
    await queryRunner.query('ALTER TABLE "EMPRESA" ADD CONSTRAINT "PK_6c194b2e463cb44421c43a58dc9" PRIMARY KEY ("EMPR_COD")');
    await queryRunner.query('ALTER TABLE "QUANTIDADE_PESQUISA" DROP CONSTRAINT "PK_7e243d5da7896dd582c83127511"');
    await queryRunner.query('ALTER TABLE "QUANTIDADE_PESQUISA" DROP COLUMN "QUPE_COD"');
    await queryRunner.query('ALTER TABLE "QUANTIDADE_PESQUISA" ADD "QUPE_COD" int NOT NULL');
    await queryRunner.query('ALTER TABLE "QUANTIDADE_PESQUISA" ADD CONSTRAINT "PK_7e243d5da7896dd582c83127511" PRIMARY KEY ("QUPE_COD")');
    await queryRunner.query('ALTER TABLE "ENDERECO" DROP CONSTRAINT "PK_e9556664a9004317b5b4201435f"');
    await queryRunner.query('ALTER TABLE "ENDERECO" DROP COLUMN "ENDE_COD"');
    await queryRunner.query('ALTER TABLE "ENDERECO" ADD "ENDE_COD" int NOT NULL');
    await queryRunner.query('ALTER TABLE "ENDERECO" ADD CONSTRAINT "PK_e9556664a9004317b5b4201435f" PRIMARY KEY ("ENDE_COD")');
    await queryRunner.query('ALTER TABLE "REL_EMPR_ATIV" DROP CONSTRAINT "PK_a7643af6a8e5467f11a28179506"');
    await queryRunner.query('ALTER TABLE "REL_EMPR_ATIV" DROP COLUMN "REFA_COD"');
    await queryRunner.query('ALTER TABLE "REL_EMPR_ATIV" ADD "REFA_COD" int NOT NULL');
    await queryRunner.query('ALTER TABLE "REL_EMPR_ATIV" ADD CONSTRAINT "PK_a7643af6a8e5467f11a28179506" PRIMARY KEY ("REFA_COD")');
  }
  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "REL_EMPR_ATIV" DROP CONSTRAINT "PK_a7643af6a8e5467f11a28179506"');
    await queryRunner.query('ALTER TABLE "REL_EMPR_ATIV" DROP COLUMN "REFA_COD"');
    await queryRunner.query('ALTER TABLE "REL_EMPR_ATIV" ADD "REFA_COD" int NOT NULL');
    await queryRunner.query('ALTER TABLE "REL_EMPR_ATIV" ADD CONSTRAINT "PK_a7643af6a8e5467f11a28179506" PRIMARY KEY ("REFA_COD")');
    await queryRunner.query('ALTER TABLE "ENDERECO" DROP CONSTRAINT "PK_e9556664a9004317b5b4201435f"');
    await queryRunner.query('ALTER TABLE "ENDERECO" DROP COLUMN "ENDE_COD"');
    await queryRunner.query('ALTER TABLE "ENDERECO" ADD "ENDE_COD" int NOT NULL');
    await queryRunner.query('ALTER TABLE "ENDERECO" ADD CONSTRAINT "PK_e9556664a9004317b5b4201435f" PRIMARY KEY ("ENDE_COD")');
    await queryRunner.query('ALTER TABLE "QUANTIDADE_PESQUISA" DROP CONSTRAINT "PK_7e243d5da7896dd582c83127511"');
    await queryRunner.query('ALTER TABLE "QUANTIDADE_PESQUISA" DROP COLUMN "QUPE_COD"');
    await queryRunner.query('ALTER TABLE "QUANTIDADE_PESQUISA" ADD "QUPE_COD" int NOT NULL');
    await queryRunner.query('ALTER TABLE "QUANTIDADE_PESQUISA" ADD CONSTRAINT "PK_7e243d5da7896dd582c83127511" PRIMARY KEY ("QUPE_COD")');
    await queryRunner.query('ALTER TABLE "EMPRESA" DROP CONSTRAINT "PK_6c194b2e463cb44421c43a58dc9"');
    await queryRunner.query('ALTER TABLE "EMPRESA" DROP COLUMN "EMPR_COD"');
    await queryRunner.query('ALTER TABLE "EMPRESA" ADD "EMPR_COD" int NOT NULL');
    await queryRunner.query('ALTER TABLE "EMPRESA" ADD CONSTRAINT "PK_6c194b2e463cb44421c43a58dc9" PRIMARY KEY ("EMPR_COD")');
    await queryRunner.query('ALTER TABLE "REL_EMPR_SOCI" ADD "REFS_EMPR_COD" int NOT NULL');
    await queryRunner.query('ALTER TABLE "REL_EMPR_SOCI" ADD "REFS_SOCI_COD" int NOT NULL');
    await queryRunner.query('ALTER TABLE "REL_EMPR_ATIV" ADD "REFA_ATIV_COD" int NOT NULL');
    await queryRunner.query('ALTER TABLE "REL_EMPR_ATIV" ADD "REFA_EMPR_COD" int NOT NULL');
    await queryRunner.query('ALTER TABLE "ENDERECO" ADD "ENDE_EMPR_COD" int NOT NULL');
    await queryRunner.query('ALTER TABLE "QUANTIDADE_PESQUISA" ADD "QUPE_EMPR_COD" int NOT NULL');
  }
}
