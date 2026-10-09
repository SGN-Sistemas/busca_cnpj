import { Request, Response } from 'express'
import { SearchEmpresaAuxService } from '../services/searchEmpresaService'
import { AddEmpresaAuxService } from '../services/addEmpresaAuxService'
import { AddEnderecoService } from '../services/addEndereco'
import { SearchEmpresaPejuFornService } from '../services/searchEmpresaPejuFornService'
import { AddPejuService } from '../services/addPessoaJuridica'
import { AddClienteService } from '../services/addCliente'
import { SearchReceitaWsServicePaid } from '../services/searchReceitaWsServicePago'
import { DeleteEmpresaBdAux } from '../services/deleteEmpresaBdAux'
/* eslint-disable @typescript-eslint/no-explicit-any */

export default class ClienteControllersPaid {
  async add (req: Request, res: Response) {
    const {
      cnpj,
      banco
    } = req.params;
    const searchEmpresaAuxService = new SearchEmpresaAuxService();
    const exitsEmpresa = await searchEmpresaAuxService.execute({
      EMPR_CNPJ: cnpj
    });
    if (!exitsEmpresa.EMPR_RAZAO_SOCIAL || exitsEmpresa.EMPR_RAZAO_SOCIAL === null || exitsEmpresa.EMPR_RAZAO_SOCIAL === '') {
      const searchReceitaWsService = new SearchReceitaWsServicePaid();
      const dadosAxios = await searchReceitaWsService.execute(cnpj);
      const addEmpresaAuxService = new AddEmpresaAuxService();
      const dadosEmpresa = await addEmpresaAuxService.execute({
        EMPR_RAZAO_SOCIAL: dadosAxios.nome,
        EMPR_FANTASIA: dadosAxios.fantasia,
        EMPR_CNPJ: cnpj,
        EMPR_TIPO: dadosAxios.tipo,
        EMPR_DATA_ABERTURA: dadosAxios.abertura,
        EMPR_TELEFONE: dadosAxios.telefone,
        EMPR_EMAIL: dadosAxios.email,
        EMPR_SITUACAO: dadosAxios.situacao,
        EMPR_PORTE: dadosAxios.porte,
        EMPR_NATUREZA_JURIDICA: dadosAxios.natureza_juridica,
        EMPR_ULTIMA_ATUALIZACAO: dadosAxios.ultima_atualizacao,
        EMPR_STATUS: dadosAxios.status,
        EMPR_MOTIVO_SITUACAO: dadosAxios.motivo_situacao,
        EMPR_SITUACAO_ESPECIAL: dadosAxios.situacao_especial,
        EMPR_CAPITAL_SOCIAL: dadosAxios.capital_social
      });
      if (!dadosEmpresa[0].RAZAO_SOCIAL || dadosEmpresa.RAZAO_SOCIAL === '') {
        const deleteEmpresaBdAux = new DeleteEmpresaBdAux();
        await deleteEmpresaBdAux.execute(dadosEmpresa[0].EMPR_COD);
        return res.status(400).json({
          message: 'Erro ao cadastrar empresa'
        });
      }
      const addEnderecoService = new AddEnderecoService();
      await addEnderecoService.execute({
        ENDE_COMPLEMENTO: dadosAxios.complemento,
        ENDE_BAIRRO: dadosAxios.bairro,
        ENDE_LOGRADOURO: dadosAxios.logradouro,
        ENDE_MUNICIPIO: dadosAxios.municipio,
        ENDE_UF: dadosAxios.uf,
        ENDE_NUMERO: dadosAxios.numero,
        ENDE_CEP: dadosAxios.cep,
        ENDE_EMPR_COD: dadosEmpresa[0].ID
      });
      const searchEmpresaPejuFornService = new SearchEmpresaPejuFornService();
      const selectEmpresaPejuForn = await searchEmpresaPejuFornService.execute({
        cnpj
      });
      const addPejuService = new AddPejuService();
      const addPejuServiceExec = await addPejuService.execute(selectEmpresaPejuForn[0].EMPR_CNPJ, selectEmpresaPejuForn[0].EMPR_EMAIL, selectEmpresaPejuForn[0].ENDE_UF, selectEmpresaPejuForn[0].ENDE_MUNICIPIO, selectEmpresaPejuForn[0].EMPR_RAZAO_SOCIAL, selectEmpresaPejuForn[0].EMPR_FANTASIA, selectEmpresaPejuForn[0].EMPR_TELEFONE, selectEmpresaPejuForn[0].ENDE_LOGRADOURO + ' ' + selectEmpresaPejuForn[0].ENDE_NUMERO + ' ' + selectEmpresaPejuForn[0].ENDE_COMPLEMENTO, selectEmpresaPejuForn[0].ENDE_CEP, selectEmpresaPejuForn[0].ENDE_BAIRRO, banco);
      const addClienteService = new AddClienteService();
      const addClienteServiceExec = await addClienteService.execute(addPejuServiceExec[0].ID, selectEmpresaPejuForn[0].EMPR_FANTASIA, banco);
      return res.json({
        ID: addClienteServiceExec[0].ID
      });
    }
    const searchEmpresaPejuFornService = new SearchEmpresaPejuFornService();
    const selectEmpresaPejuForn = await searchEmpresaPejuFornService.execute({
      cnpj
    });
    const addPejuService = new AddPejuService();
    const addPejuServiceExec = await addPejuService.execute(selectEmpresaPejuForn[0].EMPR_CNPJ, selectEmpresaPejuForn[0].EMPR_EMAIL, selectEmpresaPejuForn[0].ENDE_UF, selectEmpresaPejuForn[0].ENDE_MUNICIPIO, selectEmpresaPejuForn[0].EMPR_RAZAO_SOCIAL, selectEmpresaPejuForn[0].EMPR_FANTASIA, selectEmpresaPejuForn[0].EMPR_TELEFONE, selectEmpresaPejuForn[0].ENDE_LOGRADOURO + ' ' + selectEmpresaPejuForn[0].ENDE_NUMERO + ' ' + selectEmpresaPejuForn[0].ENDE_COMPLEMENTO, selectEmpresaPejuForn[0].ENDE_CEP, selectEmpresaPejuForn[0].ENDE_BAIRRO, banco);
    const addClienteService = new AddClienteService();
    const addClienteServiceExec = await addClienteService.execute(addPejuServiceExec[0].ID, selectEmpresaPejuForn[0].EMPR_FANTASIA, banco);
    return res.json({
      ID: addClienteServiceExec[0].ID
    });
  }
}
