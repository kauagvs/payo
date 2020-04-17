import { LauchCurrentAccount } from './lauch-current-account.interface';

export interface itemLauch {
    lancamentoContaCorrenteCliente: LauchCurrentAccount;
    dataEfetivaLancamento: string;
    dataLancamentoContaCorrenteCliente: string;
    numeroEvento: number;
    descricaoGrupoPagamento: string;
    codigoIdentificadorUnico: string;
    nomeBanco: string;
    quantidadeLancamentoRemessa: number;
    numeroRaizCNPJ: string;
    numeroSufixoCNPJ: string;
    valorLancamentoRemessa: number;
    dateLancamentoContaCorrenteCliente: any;
    dateEfetivaLancamento: any;
}
