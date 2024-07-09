import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ResidentService } from '../resident/service/resident.service';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { Resident } from '../resident/model/resident';
import { Payment } from '../../administrator/payment/model/payment';
import { PaymentService } from '../../administrator/payment/service/payment.service';

@Component({
  selector: 'app-owner-unit',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive, NgxEchartsDirective],
  templateUrl: './owner-unit.component.html',
  styleUrls: ['./owner-unit.component.scss'],
  providers: [
    provideEcharts(),
  ]
})
export class OwnerUnitComponent implements OnInit {
  residents: Resident[] = [];
  payments: Payment[] = [];
  totalValuePastPayments: number = 0;
  totalValueAllPayments: number = 0;
  countPastPayments: number = 0;
  countAllPayments: number = 0;
  today: Date = new Date();
  chartOption: EChartsOption = {};

  unitsExpected = 9;
  unitsInadimplentes: number = 0;



  constructor(
    private residentService: ResidentService,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.loadResidents();
    this.loadPayments();
  }

  loadResidents(): void {
    this.residentService.list().subscribe(
      (data: Resident[]) => {
        console.log('Todos os residentes recebidos do banco:', data);
        this.residents = data;
        this.updateChart();
      },
      error => {
        console.error('Erro ao carregar todos os dados dos residentes', error);
      }
    );
  }

  loadPayments(): void {
    this.paymentService.list().subscribe(
      (data: Payment[]) => {
        console.log('Todos os pagamentos recebidos do banco:', data);
        this.payments = data;
        this.calculatePayments();
        this.updateChart();
      },
      error => {
        console.error('Erro ao carregar todos os dados do pagamento', error);
      }
    );
  }

  calculatePayments(): void {
    const pastPayments = this.payments.filter(payment => {
      const paymentDate = new Date(payment.datePayment);
      return paymentDate < this.today && payment.statusPayment !== 'Pago';
    });

    this.totalValuePastPayments = pastPayments.reduce((total, payment) => {
      const value = this.parsePaymentValue(payment.valuePayment);
      return total + value;
    }, 0);

    this.totalValueAllPayments = this.payments.reduce((total, payment) => {
      const value = this.parsePaymentValue(payment.valuePayment);
      return total + value;
    }, 0);

    this.countPastPayments = pastPayments.length;
    this.countAllPayments = this.payments.length;

    console.log('Total value of past payments:', this.totalValuePastPayments);
    console.log('Count of past payments:', this.countPastPayments);
    console.log('Total value of all payments:', this.totalValueAllPayments);
    console.log('Count of all payments:', this.countAllPayments);
  }

  private parsePaymentValue(value: string): number {
    const numericValue = parseFloat(value.replace(/[^\d.,]/g, '').replace(',', '.'));
    return isNaN(numericValue) ? 0 : numericValue;
  }

  private getLastTwelveMonths(): string[] {
    const months = [];
    const now = new Date();
    for (let i = 0; i < 12; i++) {
      const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthString = `${month.getFullYear()}-${(month.getMonth() + 1).toString().padStart(2, '0')}`;
      months.push(monthString);
    }
    return months.reverse();
  }

  private getPaymentsByMonth(): { [key: string]: Payment[] } {
    const paymentsByMonth: { [key: string]: Payment[] } = {};
    this.payments.forEach(payment => {
      const date = new Date(payment.datePayment);
      const month = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      if (!paymentsByMonth[month]) {
        paymentsByMonth[month] = [];
      }
      paymentsByMonth[month].push(payment);
    });
    return paymentsByMonth;
  }

  private countPaymentsByStatus(payments: Payment[], status: string): number {
    return payments.filter(payment => payment.statusPayment === status).length;
  }

  calculateUnitsInadimplentes(): void {
    const unitsPaid = this.countPaymentsByStatus(this.payments, 'Atrasado');
    this.unitsInadimplentes = this.unitsExpected - unitsPaid;
    this.updateChart(); // Atualize o gráfico após calcular as unidades inadimplentes
  }



  updateChart(): void {
    if (this.residents.length && this.payments.length) {
      const lastTwelveMonths = this.getLastTwelveMonths();

      const paymentsByMonth = this.getPaymentsByMonth();
      const openPaymentsData = lastTwelveMonths.map(month => this.countPaymentsByStatus(paymentsByMonth[month] || [], 'Aberto'));
      const paidPaymentsData = lastTwelveMonths.map(month => this.countPaymentsByStatus(paymentsByMonth[month] || [], 'Pago'));
      const overduePaymentsData = lastTwelveMonths.map(month => this.countPaymentsByStatus(paymentsByMonth[month] || [], 'Atrasado'));

      this.chartOption = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Aberto', 'Pago', 'Inadimplênte']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: lastTwelveMonths,
          axisLabel: {
            rotate: 45,
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Aberto',
            type: 'line',
            smooth: true,
            data: openPaymentsData,
            label: {
              show: true,
              position: 'top',
              formatter: '{c} unidade(s)'
            }
          },
          {
            name: 'Pago',
            type: 'line',
            smooth: true,
            data: paidPaymentsData,
            label: {
              show: true,
              position: 'top',
              formatter: '{c} unidade(s)'
            }
          },
          {
            name: 'Inadimplênte',
            type: 'line',
            smooth: true,
            data: overduePaymentsData ,
            label: {
              show: true,
              position: 'top',
              formatter: '{c} unidade(s)'
            }
          },
        ]
      };
    }
  }
}
