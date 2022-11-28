const insertEMPR = (
  EMPR_RAZAO_SOCIAL: string,
  EMPR_FANTASIA: string,
  EMPR_CNPJ: string,
  EMPR_TIPO: string,
  EMPR_DATA_ABERTURA: string,
  EMPR_TELEFONE: string,
  EMPR_EMAIL: string,
  EMPR_SITUACAO: string,
  EMPR_PORTE: string,
  EMPR_NATUREZA_JURIDICA: string,
  EMPR_ULTIMA_ATUALIZACAO: string,
  EMPR_STATUS: string,
  EMPR_MOTIVO_SITUACAO: string,
  EMPR_SITUACAO_ESPECIAL: string,
  EMPR_CAPITAL_SOCIAL : string
) => {
  return `
    
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
                    EMPR_ULTIMA_ATUALIZACAO_NOSSA,
                    EMPR_STATUS,
                    EMPR_MOTIVO_SITUACAO,
                    EMPR_SITUACAO_ESPECIAL,
                    EMPR_CAPITAL_SOCIAL
                )
        VALUES
            (
                '${EMPR_RAZAO_SOCIAL}',
                '${EMPR_FANTASIA}',
                '${EMPR_CNPJ}',
                '${EMPR_TIPO}',
                '${EMPR_DATA_ABERTURA}',
                '${EMPR_TELEFONE}',
                '${EMPR_EMAIL}',
                '${EMPR_SITUACAO}',
                '${EMPR_PORTE}',
                '${EMPR_NATUREZA_JURIDICA}',
                '${EMPR_ULTIMA_ATUALIZACAO}',
                GETDATE(),
                '${EMPR_STATUS}',
                '${EMPR_MOTIVO_SITUACAO}',
                '${EMPR_SITUACAO_ESPECIAL}',
                '${EMPR_CAPITAL_SOCIAL}'
            )
        
        SELECT 
            @@IDENTITY  AS ID

    `
}

const insertSocio = (
  SOCI_NOME : string,
  SOCI_TIPO : string
) => {
  return `
    INSERT INTO 
        SOCIOS
        (
            SOCI_NOME,
            SOCI_TIPO
        )
    VALUES
        (
            '${SOCI_NOME}',
            '${SOCI_TIPO}'
        )
    
    SELECT 
        @@IDENTITY  AS ID
    `
}

const insertRelEMPRSocio = (
  REFS_SOCI_COD : string,
  REFS_EMPR_COD : string
) => {
  return `
    INSERT INTO 
        REL_EMPR_SOCI
            (
                REFS_SOCI_COD,
                REFS_EMPR_COD
            )
    VALUES
        (
            '${REFS_SOCI_COD}',
            '${REFS_EMPR_COD}'
        )
    
    SELECT 
        @@IDENTITY  AS ID
    `
}

const insertEndereco = (
  ENDE_COMPLEMENTO : string,
  ENDE_BAIRRO : string,
  ENDE_LOGRADOURO : string,
  ENDE_MUNICIPIO : string,
  ENDE_UF : string,
  ENDE_NUMERO : string,
  ENDE_CEP : string,
  ENDE_EMPR_COD : string
) => {
  return `
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
            '${ENDE_COMPLEMENTO}',
            '${ENDE_BAIRRO}',
            '${ENDE_LOGRADOURO}',
            '${ENDE_MUNICIPIO}',
            '${ENDE_UF}',
            '${ENDE_NUMERO}',
            '${ENDE_CEP}',
            ${ENDE_EMPR_COD}
                
        )
    
    SELECT 
        @@IDENTITY  AS ID        
    `
}

const insertAtividade = (
  ATIV_DESC : string,
  ATIV_CODIGO : string,
  ATIV_TIPO : string
) => {
  return `
    INSERT INTO
        ATIVIDADE 
            (
                ATIV_DESC,
                ATIV_CODIGO,
                ATIV_TIPO
            )
    VALUES
        (
            '${ATIV_DESC}',
            '${ATIV_CODIGO}',
            '${ATIV_TIPO}'
        )
    
    SELECT 
        @@IDENTITY  AS ID 
    `
}

const insertRelAtvEmpr = (
  REFA_EMPR_COD : string,
  REFA_ATIV_COD : string
) => {
  return `
        INSERT INTO
            REL_EMPR_ATIV
                (

                    REFA_EMPR_COD,
                    REFA_ATIV_COD  
                )
        VALUES
            (
                ${REFA_EMPR_COD},
                ${REFA_ATIV_COD} 
            )
    `
}

const insertPessoaJuridica = (
  PEJU_COD : string,
  PEJU_CGC : string,
  PEJU_EMAIL : string,
  PEJU_UNFE_SIGLA : string,
  PEJU_CIDADE : string,
  PEJU_RAZAO_SOCIAL : string,
  PEJU_NOME_FANTASIA : string,
  PEJU_TEL : string,
  PEJU_END : string,
  PEJU_CEP : string,
  PEJU_BAIRRO : string
) => {
  return `
    INSERT INTO 
        LEAO.dbo.PESSOA_JURIDICA
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
            ${PEJU_COD},
            '${PEJU_CGC}',
            '${PEJU_EMAIL}',
            '${PEJU_UNFE_SIGLA}',
            '${PEJU_CIDADE}',
            '${PEJU_RAZAO_SOCIAL}',
            '${PEJU_NOME_FANTASIA}',
            '${PEJU_TEL}',
            '${PEJU_END}',
            '${PEJU_CEP}',
            '${PEJU_BAIRRO}',
            'N',
            'L'
        )
        
    `
}

const insertFornedor = (
  FORN_NOME : string,
  FORN_COD : string,
  FORN_TIPO_COD : string
) => {
  return `
    INSERT INTO
        LEAO.dbo.FORNECEDOR
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
            ${FORN_COD},
            '${FORN_NOME}',
            'N',
            'N',
            'N',
            'J',
            ${FORN_TIPO_COD}
        )
        
        SELECT ${FORN_COD} as ID
    `
}

export {
  insertEMPR,
  insertSocio,
  insertRelEMPRSocio,
  insertEndereco,
  insertAtividade,
  insertRelAtvEmpr,
  insertPessoaJuridica,
  insertFornedor
}
