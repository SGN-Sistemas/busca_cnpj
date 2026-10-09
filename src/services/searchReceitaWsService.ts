import axios from 'axios'
/* eslint-disable @typescript-eslint/no-explicit-any */

export class SearchReceitaWsService {
  async execute (cnpj: any): Promise<any> {
    let jsonReturn: any
    console.log(`[CNPJ] enviado para a ReceitaWS: https://receitaws.com.br/v1/cnpj/${cnpj}`);
    await axios.get(`https://receitaws.com.br/v1/cnpj/${cnpj}`, {
      headers: {
        'Accept-Encoding': 'gzip,deflate,compress'
      }
    }).then(async response => {
      const {
        fantasia,
        complemento,
        nome,
        telefone,
        email,
        atividadesSecundarias,
        atividadePrincipal,
        qsa,
        situacao,
        bairro,
        logradouro,
        numero,
        cep,
        municipio,
        porte,
        naturezaJuridica,
        uf,
        cnpj,
        ultimaAtualizacao,
        status,
        efr,
        motivoSituacao,
        situacaoEspecial,
        capitalSocial,
        tipo,
        abertura
      } = response.data;
      jsonReturn = {
        fantasia,
        complemento,
        nome,
        telefone,
        email,
        atividadesSecundarias,
        atividadePrincipal,
        qsa,
        situacao,
        bairro,
        logradouro,
        numero,
        cep,
        municipio,
        porte,
        naturezaJuridica,
        uf,
        cnpj,
        ultimaAtualizacao,
        status,
        efr,
        motivoSituacao,
        situacaoEspecial,
        capitalSocial,
        tipo,
        abertura
      };
    }).catch(e => {
      jsonReturn = {
        statusCode: e.status,
        message: e.message
      };
    });
    return jsonReturn;
  }
}
