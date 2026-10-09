// Valida o nome do banco (não pode ser parâmetro) para evitar SQL injection
export const nomeBanco = (banco: any) => {
  if (typeof banco !== 'string' || !/^[A-Za-z0-9_]+$/.test(banco)) {
    throw new Error(`Nome de banco inválido: ${banco}`);
  }
  return `[${banco}]`;
};
export const insertEmpresaAux = (EMPR_RAZAO_SOCIAL: any, EMPR_FANTASIA: any, EMPR_CNPJ: any, EMPR_TIPO: any, EMPR_DATA_ABERTURA: any, EMPR_TELEFONE: any, EMPR_EMAIL: any, EMPR_SITUACAO: any, EMPR_PORTE: any, EMPR_NATUREZA_JURIDICA: any, EMPR_ULTIMA_ATUALIZACAO: any, EMPR_STATUS: any, EMPR_MOTIVO_SITUACAO: any, EMPR_SITUACAO_ESPECIAL: any, EMPR_CAPITAL_SOCIAL: any) => {
  const sql = `
        INSERT INTO 
            EMPRESA
                (
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
                    EMPR_STATUS,
                    EMPR_MOTIVO_SITUACAO,
                    EMPR_SITUACAO_ESPECIAL,
                    EMPR_CAPITAL_SOCIAL
                )
        VALUES
            (
                @0,
                @1,
                @2,
                @3,
                @4,
                @5,
                @6,
                @7,
                @8,
                @9,
                @10,
                @11,
                @12,
                @13,
                @14
            )
            
        SELECT 
            @@IDENTITY  AS ID,
            (
                SELECT
                    EMPR_RAZAO_SOCIAL
                FROM 
                    EMPRESA
                WHERE
                    EMPR_COD = @@IDENTITY
            ) AS RAZAO_SOCIAL
    `;
  return { sql, params: [EMPR_RAZAO_SOCIAL, EMPR_FANTASIA, EMPR_CNPJ, EMPR_TIPO, EMPR_DATA_ABERTURA, EMPR_TELEFONE, EMPR_EMAIL, EMPR_SITUACAO, EMPR_PORTE, EMPR_NATUREZA_JURIDICA, EMPR_ULTIMA_ATUALIZACAO, EMPR_STATUS, EMPR_MOTIVO_SITUACAO, EMPR_SITUACAO_ESPECIAL, EMPR_CAPITAL_SOCIAL] };
};
export const insertEnde = (ENDE_COMPLEMENTO: any, ENDE_BAIRRO: any, ENDE_LOGRADOURO: any, ENDE_MUNICIPIO: any, ENDE_UF: any, ENDE_NUMERO: any, ENDE_CEP: any, ENDE_EMPR_COD: any) => {
  const sql = `
    INSERT INTO
        ENDERECO
            (
                ENDE_COMPLEMENTO,
                ENDE_BAIRRO,
                ENDE_LOGRADOURO,
                ENDE_MUNICIPIO,
                ENDE_UF,
                ENDE_NUMERO,
                ENDE_CEP,
                ENDE_EMPR_COD
            )
    VALUES
        (
            @0,
            @1,
            @2,
            @3,
            @4,
            @5,
            @6,
            @7
        )
  `;
  return { sql, params: [ENDE_COMPLEMENTO, ENDE_BAIRRO, ENDE_LOGRADOURO, ENDE_MUNICIPIO, ENDE_UF, ENDE_NUMERO, ENDE_CEP, ENDE_EMPR_COD] };
};
export const selectEmpresaEndereco = (cnpj: any) => {
  const sql = `
        SELECT
            EMPR_CNPJ,
            EMPR_EMAIL,
            ENDE_UF,
            ENDE_MUNICIPIO,
            EMPR_RAZAO_SOCIAL,
            EMPR_FANTASIA,
            EMPR_TELEFONE,
            ENDE_COMPLEMENTO,
            ENDE_CEP,
            ENDE_BAIRRO,
            ENDE_LOGRADOURO,
            ENDE_NUMERO
        FROM 
            EMPRESA
        INNER JOIN
            ENDERECO
        ON
            ENDE_EMPR_COD = EMPR_COD
        WHERE
            EMPR_CNPJ = @0
    `;
  return { sql, params: [cnpj] };
};
export const insertPessoaJuridica = (PEJU_COD: any, PEJU_CGC: any, PEJU_EMAIL: any, PEJU_UNFE_SIGLA: any, PEJU_CIDADE: any, PEJU_RAZAO_SOCIAL: any, PEJU_NOME_FANTASIA: any, PEJU_TEL: any, PEJU_END: any, PEJU_CEP: any, PEJU_BAIRRO: any, banco: any) => {
  const sql = `
    INSERT INTO 
        ${nomeBanco(banco)}.dbo.PESSOA_JURIDICA
            (
                PEJU_COD,
                PEJU_CGC,
                PEJU_EMAIL,
                PEJU_UNFE_SIGLA,
                PEJU_CIDADE,
                PEJU_RAZAO_SOCIAL,
                PEJU_NOME_FANTASIA,
                PEJU_TEL,
                PEJU_END,
                PEJU_CEP,
                PEJU_BAIRRO,
                PEJU_IND_BLOQUEIO,
                PEJU_TIPO_EMPRESA
            )
    VALUES
        (
            @10,
            @0,
            @1,
            @2,
            @3,
            @4,
            @5,
            @6,
            @7,
            @8,
            @9,
            'N',
            'L'
        )
        
    `;
  return { sql, params: [PEJU_CGC, PEJU_EMAIL, PEJU_UNFE_SIGLA, PEJU_CIDADE, PEJU_RAZAO_SOCIAL, PEJU_NOME_FANTASIA, PEJU_TEL, PEJU_END, PEJU_CEP, PEJU_BAIRRO, PEJU_COD] };
};
export const insertFornedor = (FORN_NOME: any, FORN_COD: any, FORN_TIPO_COD: any, banco: any) => {
  const sql = `
    INSERT INTO
        ${nomeBanco(banco)}.dbo.FORNECEDOR
            (
                FORN_COD,
                FORN_NOME,
                FORN_IND_IR,
                FORN_IND_INSS,
                FORN_IND_ISS,
                FORN_TIPO,
                FORN_TIPO_COD
            )
    VALUES
        (
            @1,
            @0,
            'N',
            'N',
            'N',
            'J',
            @2
        )
        
        SELECT @1 as ID
    `;
  return { sql, params: [FORN_NOME, FORN_COD, FORN_TIPO_COD] };
};
export const addCliente = (CLIE_TIPO_COD: any, CLIE_NOME: any, CLIE_COD: any, banco: any) => {
  const sql = `
        INSERT INTO
            ${nomeBanco(banco)}.dbo.CLIENTE
                (
                    CLIE_INTERVENIENTE_PAGADOR,
                    CLIE_TIPO_COD,
                    CLIE_TIPO,
                    CLIE_NOME,
                    CLIE_COD
                )
        VALUES
            (
                'N',
                @1,
                'F',
                @0,
                @2
            )


  `;
  return { sql, params: [CLIE_NOME, CLIE_TIPO_COD, CLIE_COD] };
};
export const addEmpresa = (banco: any, EMPR_COD: any, EMPR_NOME: any, EMPR_FONE: any, EMPR_BAIRRO: any, EMPR_UNFE_SIGLA: any, EMPR_END: any, EMPR_CIDADE: any, EMPR_CGC: any, EMPR_CEP: any, EMPR_EMAIL: any) => {
  const sql = `
        INSERT INTO
            ${nomeBanco(banco)}.dbo.EMPRESA
                (
                    EMPR_COD,
                    EMPR_NOME,
                    EMPR_IND_BLOQ,
                    EMPR_FONE,
                    EMPR_BAIRRO,
                    EMPR_UNFE_SIGLA,
                    EMPR_END,
                    EMPR_CIDADE,
                    EMPR_CGC,
                    EMPR_CEP,
                    EMPR_EMAIL
                )
        VALUES
            (
                @9,
                @0,
                'N',
                @1,
                @2,
                @3,
                @4,
                @5,
                @6,
                @7,
                @8
            )
  `;
  return { sql, params: [EMPR_NOME, EMPR_FONE, EMPR_BAIRRO, EMPR_UNFE_SIGLA, EMPR_END, EMPR_CIDADE, EMPR_CGC, EMPR_CEP, EMPR_EMAIL, EMPR_COD] };
};
export const addFilial = (banco: any, FILI_COD: any, FILI_UNFE_SIGLA: any, FILI_EMPR_COD: any, FILI_NOME_FANTASIA: any, FILI_CGC: any, FILI_ENDERECO: any, FILI_CIDADE: any, FILI_TELEFONE: any, FILI_CEP: any, FILI_BAIRRO: any, FILI_EMAIL: any) => {
  const sql = `
        INSERT INTO
            ${nomeBanco(banco)}.dbo.FILIAL
                (
                    FILI_COD,
                    FILI_UNFE_SIGLA,
                    FILI_EMPR_COD,
                    FILI_NOME_FANTASIA,
                    FILI_CGC,
                    FILI_ENDERECO,
                    FILI_CIDADE,
                    FILI_TELEFONE,
                    FILI_CEP,
                    FILI_BAIRRO,
                    FILI_EMAIL,
                    FILI_IND_BLOQ
                )
        VALUES
            (
                @0,
                @1,
                @10,
                @2,
                @3,
                @4,
                @5,
                @6,
                @7,
                @8,
                @9,
                'N'
            )
    `;
  return { sql, params: [FILI_COD, FILI_UNFE_SIGLA, FILI_NOME_FANTASIA, FILI_CGC, FILI_ENDERECO, FILI_CIDADE, FILI_TELEFONE, FILI_CEP, FILI_BAIRRO, FILI_EMAIL, FILI_EMPR_COD] };
};
