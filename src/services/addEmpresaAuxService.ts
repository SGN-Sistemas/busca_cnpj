import { insertEmpresaAux } from '../queries'
import { empresaRepository } from '../typeorm/repository/empresaRepository'
export class AddEmpresaAuxService {
  async execute ({
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
  }: any): Promise<any> {
    let razao;
    let fantasia;
    let cnpj;
    let tipo;
    let abertura;
    let telefone;
    let email;
    let situacao;
    let porte;
    let naturezaJuridica;
    let ultimaAtualizacao;
    let status;
    let motivoSituacao;
    let situacaoEspecial;
    let capitalSocial;

    // data de hoje
    const date = new Date();
    const dateFt = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    // validar se ta undefined
    if (EMPR_RAZAO_SOCIAL === undefined) {
      razao = '';
    } else {
      razao = EMPR_RAZAO_SOCIAL;
    }
    if (EMPR_FANTASIA === undefined) {
      fantasia = '';
    } else {
      fantasia = EMPR_FANTASIA;
    }
    if (EMPR_CNPJ === undefined) {
      cnpj = '';
    } else {
      cnpj = EMPR_CNPJ;
    }
    if (EMPR_TIPO === undefined) {
      tipo = '';
    } else {
      tipo = EMPR_TIPO;
    }
    if (EMPR_DATA_ABERTURA === undefined) {
      abertura = '';
    } else {
      abertura = EMPR_DATA_ABERTURA;
    }
    if (EMPR_TELEFONE === undefined) {
      telefone = '';
    } else {
      telefone = EMPR_TELEFONE;
    }
    if (EMPR_EMAIL === undefined) {
      email = '';
    } else {
      email = EMPR_EMAIL;
    }
    if (EMPR_SITUACAO === undefined) {
      situacao = '';
    } else {
      situacao = EMPR_SITUACAO;
    }
    if (EMPR_PORTE === undefined) {
      porte = '';
    } else {
      porte = EMPR_PORTE;
    }
    if (EMPR_NATUREZA_JURIDICA === undefined) {
      naturezaJuridica = dateFt;
    } else {
      naturezaJuridica = EMPR_NATUREZA_JURIDICA;
    }
    if (EMPR_ULTIMA_ATUALIZACAO === undefined) {
      ultimaAtualizacao = dateFt.toString();
    } else {
      ultimaAtualizacao = EMPR_ULTIMA_ATUALIZACAO;
    }
    if (EMPR_STATUS === undefined) {
      status = '';
    } else {
      status = EMPR_STATUS;
    }
    if (EMPR_MOTIVO_SITUACAO === undefined) {
      motivoSituacao = '';
    } else {
      motivoSituacao = EMPR_MOTIVO_SITUACAO;
    }
    if (EMPR_SITUACAO_ESPECIAL === undefined) {
      situacaoEspecial = '';
    } else {
      situacaoEspecial = EMPR_SITUACAO_ESPECIAL;
    }
    if (EMPR_CAPITAL_SOCIAL === undefined) {
      capitalSocial = null;
    } else {
      capitalSocial = EMPR_CAPITAL_SOCIAL;
    }
    const sql = insertEmpresaAux(razao, fantasia, cnpj, tipo, abertura, telefone, email, situacao, porte, naturezaJuridica, ultimaAtualizacao, status, motivoSituacao, situacaoEspecial, capitalSocial);
    const empresaQuery = await empresaRepository.query(sql.sql, sql.params);
    return empresaQuery;
  }
}
