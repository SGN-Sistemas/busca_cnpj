import { insertEnde } from '../queries'
import { enderecoRepository } from '../typeorm/repository/enderecoRepository'
export class AddEnderecoService {
  async execute ({
    ENDE_COMPLEMENTO,
    ENDE_BAIRRO,
    ENDE_LOGRADOURO,
    ENDE_MUNICIPIO,
    ENDE_UF,
    ENDE_NUMERO,
    ENDE_CEP,
    ENDE_EMPR_COD
  }: any): Promise<any> {
    let complemento;
    let bairro;
    let logradouro;
    let municipio;
    let uf;
    let numero;
    let cep;
    if (ENDE_COMPLEMENTO === undefined) {
      complemento = '';
    } else {
      complemento = ENDE_COMPLEMENTO;
    }
    if (ENDE_BAIRRO === undefined) {
      bairro = '';
    } else {
      bairro = ENDE_BAIRRO;
    }
    if (ENDE_LOGRADOURO === undefined) {
      logradouro = '';
    } else {
      logradouro = ENDE_LOGRADOURO;
    }
    if (ENDE_MUNICIPIO === undefined) {
      municipio = '';
    } else {
      municipio = ENDE_MUNICIPIO;
    }
    if (ENDE_UF === undefined) {
      uf = '';
    } else {
      uf = ENDE_UF;
    }
    if (ENDE_NUMERO === undefined) {
      numero = '';
    } else {
      numero = ENDE_NUMERO;
    }
    if (ENDE_CEP === undefined) {
      cep = '';
    } else {
      const cep1 = ENDE_CEP.replace('.', '');
      const cepBD = cep1.replace('-', '');
      cep = cepBD;
    }
    const emprCod = ENDE_EMPR_COD;
    const sql = insertEnde(complemento, bairro, logradouro, municipio, uf, numero, cep, emprCod);
    const endereco = await enderecoRepository.query(sql.sql, sql.params);
    return endereco;
  }
}
