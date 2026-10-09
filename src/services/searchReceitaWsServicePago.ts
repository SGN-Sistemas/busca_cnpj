import axios from 'axios'
import dotenv from 'dotenv'
/* eslint-disable @typescript-eslint/no-explicit-any */

dotenv.config();
export class SearchReceitaWsServicePaid {
  async execute (cnpj: any): Promise<any> {
    const tokenWS = process.env.TOKEN_WS;
    let jsonReturn: any
    console.log(`[CNPJ] enviado para a ReceitaWS: https://receitaws.com.br/v1/cnpj/${cnpj}/days/7`);
    await axios.get(`https://receitaws.com.br/v1/cnpj/${cnpj}/days/7`, {
      headers: {
        'Accept-Encoding': 'gzip,deflate,compress',
        Authorization: `Bearer ${tokenWS}`
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
