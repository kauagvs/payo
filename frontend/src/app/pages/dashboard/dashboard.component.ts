import { Component, AfterViewInit } from "@angular/core";
import { ApiService } from "./../../services/api/api.service";
import { Subject } from "rxjs";
import { Launchs } from "src/app/shared/launchs.interface";
import { itemLauch } from 'src/app/shared/item-lauch.interface';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements AfterViewInit {
  public data: Subject<Launchs> = new Subject();
  public lauchTotalData: object;


  public dataCardLauchs: any[];
  public dataTableLauchs: any[] = [];

  constructor(private apiService: ApiService) {}

  ngAfterViewInit() {
    this.getData();
  }

  getData() {
    this.apiService.getData().subscribe((data: Launchs) => {
      this.data.next(data);
      this.setElementData(data);
    });
  }

  setElementData(data: any) {
    let lauchControlTotalData = data.totalControleLancamento;
    this.dataCardLauchs = [
      {
        name: "Valor dos lançamentos",
        value: `R$ ${lauchControlTotalData.valorLancamentos}`,
        icon: "fas fa-dollar-sign"
      },
      {
        name: "Quantidade de Lançamentos",
        value: lauchControlTotalData.quantidadeLancamentos,
        icon: "far fa-paper-plane"
      },
      {
        name: "Quantidade de Remessas",
        value: lauchControlTotalData.quantidadeRemessas,
        icon: "fas fa-boxes"
      }
    ];

    this.dataTableLauchs = data.listaControleLancamento.map((item: itemLauch) => {
      return {
        'number': item.numeroEvento,
        'description': item.descricaoGrupoPagamento,
        'bankData': `${item.nomeBanco}
          Ag ${item.lancamentoContaCorrenteCliente.dadosDomicilioBancario.numeroAgencia}
          CC ${parseInt(item.lancamentoContaCorrenteCliente.dadosDomicilioBancario.numeroContaCorrente)}`,
        'lauchData': item.dataLancamentoContaCorrenteCliente,
        'confirmationDate': item.dataEfetivaLancamento,
        'finalValue': item.valorLancamentoRemessa,
        'situation': item.lancamentoContaCorrenteCliente.nomeSituacaoRemessa,
      }
    });
    console.log(this.dataTableLauchs);
  }
}
