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
  resident: Resident | null = null;
  payments: Payment[] = [];
  totalValuePastPayments: number = 0;
  countPastPayments: number = 0;
  today: Date = new Date();

  constructor(
    private service: ResidentService,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  chartOption: EChartsOption = {
    title: {
      text: 'Cota Condominial'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Adimplênte','','','Inadimplênte']
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
        data: ['','Jul/24', 'Ago/24', 'Set/24', 'Out/24', 'Nov/24', 'Dez/24', 'Jan/24', 'Fev/24', 'Mar/24', 'Abr/24', 'Mai/24', 'Jun/24'],
        axisLabel: {
          rotate: 45,
        }
      },
    yAxis: {
      type: 'value'
    },
    series: [
       {
          name: 'Adimplênte',

          type: 'line',
          smooth: true,
          data: [ ,8, 7, ],
          label: {
            show: true,
            position: 'top',
            formatter: '{c} unidade(s)'
          }
        },
        {
          name: 'Inadimplênte',

          type: 'line',
          data: [ ,1, 2,],
          label: {
            show: true,
            position: 'top',
            formatter: '{c} unidade(s)'
          }
        },
    ]
  };

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.paymentService.list().subscribe(
      (data: Payment[]) => {
        console.log('Todos os pagamentos recebidos do banco:', data);
        this.payments = data;  // Atribui o array de pagamentos à variável 'payments'
        this.calculatePastPayments();  // Calcula os pagamentos atrasados após carregar os pagamentos
      },
      error => {
        console.error('Erro ao carregar todos os dados do pagamento', error);
      }
    );
  }

  calculatePastPayments(): void {
    const today = new Date();

    const pastPayments = this.payments.filter(payment => {
      const paymentDate = new Date(payment.datePayment);
      return paymentDate < today && payment.statusPayment !== 'Pago';
    });

    this.totalValuePastPayments = pastPayments.reduce((total, payment) => {
      return total + parseFloat(payment.valuePayment);
    }, 0);

    this.countPastPayments = pastPayments.length;

    console.log('Total value of past payments:', this.formatCurrency(this.totalValuePastPayments));
    console.log('Count of past payments:', this.countPastPayments);
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  transformStringToDate(dateString: string): Date {
    return new Date(dateString);
  }
}
