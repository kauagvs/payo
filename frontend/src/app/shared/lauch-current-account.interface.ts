import { Bank } from './bank.interface';

export interface LauchCurrentAccount {
  numeroRemessaBanco: any;
  nomeSituacaoRemessa: string;
  dadosDomicilioBancario: Bank;
  nomeTipoOperacao: string;
  dadosAnaliticoLancamentoFinanceiroCliente: any[];
}
