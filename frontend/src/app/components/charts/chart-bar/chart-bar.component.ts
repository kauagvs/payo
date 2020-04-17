import { Component, OnInit, Input } from "@angular/core";
import { Subject } from "rxjs";
import { Launchs } from "src/app/shared/launchs.interface";
import { itemLauch } from "src/app/shared/item-lauch.interface";
import { Chart } from "chart.js";

@Component({
  selector: 'app-chart-bar',
  templateUrl: './chart-bar.component.html',
  styleUrls: ['./chart-bar.component.scss']
})
export class ChartBarComponent implements OnInit {

  @Input() data: Subject<Launchs>;
  public chartData: string[] = [];
  public chartDataNotPay: string[] = [];
  public paymentsSituation = {
    pay: [],
    notPay: []
  }
  public paymentYears: string[] = [];
  public chartBar: any = {};

  constructor() { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.data.subscribe((data: Launchs) => {
      this.payments(data);
    });
  }

  payments(data: Launchs) {

    const situationNames = ['Nao Pago', 'Pago'];
    const paymentSituation = {};

    situationNames.forEach(element => {
      this.paymentsSituation.pay = data.listaControleLancamento.filter(
        (item: itemLauch) => {
          return (
            item.lancamentoContaCorrenteCliente.nomeSituacaoRemessa === "Pago"
          );
        }
      );
      this.paymentsSituation.notPay = data.listaControleLancamento.filter(
        (item: itemLauch) => {
          return (
            item.lancamentoContaCorrenteCliente.nomeSituacaoRemessa === "Nao Pago"
          );
        }
      );

    });

    this.getPaymentYear(data);
  }

  getPaymentYear(data: Launchs) {

    const forYear = {};

    this.paymentYears = data.listaControleLancamento
    .map((item: itemLauch) => {
      return item.dataEfetivaLancamento.split('/')[2];
    });
    this.paymentYears = [...new Set(this.paymentYears)]
    this.paymentYears = this.paymentYears;

    this.paymentYears.forEach(element => {
      forYear[element] = this.paymentsSituation.pay.filter(
        (item: itemLauch) => {
          return item.dataEfetivaLancamento.match(element);
        }
      );
      this.chartData.push(forYear[element].length);
    });

    this.paymentYears.forEach(element => {
      forYear[element] = this.paymentsSituation.notPay.filter(
        (item: itemLauch) => {
          return item.dataEfetivaLancamento.match(element);
        }
      );
      this.chartDataNotPay.push(forYear[element].length);
    });

    this.setChartBar(data);
  }

  setChartBar(data: Launchs) {
    this.chartBar = {
      data :{
        labels: this.paymentYears,
        datasets: [
          {
            label: 'Lançamentos pagos do ano',
            data: this.chartData,
            backgroundColor: 'transparent',
            borderColor: '#36a2eb',
            borderWidth: 2
          },
          {
            label: 'Lançamentos não pagos do ano',
            data: this.chartDataNotPay,
            backgroundColor: 'transparent',
            borderColor: '#ff9090',
            borderWidth: 2
          }
        ]
      },
      options:{
        scales: {
            yAxes: [{
              ticks: {
                  fontColor: 'rgba(0,0,0,.6)',
                  fontStyle: 'bold',
                  beginAtZero: true,
                  maxTicksLimit: 8,
                  padding: 10
              }
          }]
        },
        responsive: true,
        legend: {
          position:'bottom',
          display:false
        },
      }
    };
    this.createChart();
  }

  createChart() {
    new Chart('chart-bar',  {
      type: 'bar',
      data: this.chartBar.data,
      options: this.chartBar.options
    });
   }


}
