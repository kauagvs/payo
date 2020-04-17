import { Component, OnInit, Input } from "@angular/core";
import { Subject } from "rxjs";
import { Launchs } from "src/app/shared/launchs.interface";
import { itemLauch } from "src/app/shared/item-lauch.interface";
import { Chart } from "chart.js";

@Component({
  selector: "app-chart-doughnut",
  templateUrl: "./chart-doughnut.component.html",
  styleUrls: ["./chart-doughnut.component.scss"]
})
export class ChartDoughnutComponent implements OnInit {
  @Input() data: Subject<Launchs>;

  public chartData: number[] = [];

  public chartDoughnut: any = {
    data: {
      datasets: [
        {
          data: this.chartData,
          backgroundColor: ["#ff9090", "#36a2eb"]
        }
      ],
      labels: ["Não pago", "Pagos"]
    },
    options: {
      legend: {
        position: "bottom",
        display: false
      },
      cutoutPercentage: 80
    }
  };


  constructor() {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.data.subscribe((data: Launchs) => {
      this.payments(data);
    });
  }

  createChart() {
    new Chart("chart-doughnut", {
      type: "doughnut",
      data: this.chartDoughnut.data,
      options: this.chartDoughnut.options
    });
  }


  payments(data: Launchs) {

    const situationNames = ['Nao Pago', 'Pago'];
    const paymentSituation = {};

    situationNames.forEach(element => {
      paymentSituation[element] = data.listaControleLancamento.filter(
        (item: itemLauch) => {
          return (
            item.lancamentoContaCorrenteCliente.nomeSituacaoRemessa === element
          );
        }
      );
      this.chartData.push(paymentSituation[element].length);
    });

    this.createChart();
  }
}
