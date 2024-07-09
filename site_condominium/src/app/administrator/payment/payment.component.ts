import { Component, NgModule, OnInit } from '@angular/core';
import { ResidentService } from '../../pages/resident/service/resident.service';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Resident } from '../../pages/resident/model/resident';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { PaymentService } from './service/payment.service';
import { Payment } from './model/payment';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive, FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  residents: Resident[] = [];
  loggedInUserName: string = '';

  statusOptions: string[] = ['Aberto', 'Pago', 'Atrasado'];

  selectedResident: Resident | null = null;
  selectedResidentId: string = '';
  newBoleto: Payment = {
    id: '',
    idResident: '',
    imagePayment: '',
    registryUser: '',
    numberPayment: '',
    valuePayment: '',
    statusPayment: 'Aberto',
    datePayment: ''
  };

  boletos: Payment[] = [];

  constructor(
    private service: ResidentService,
    private paymentService: PaymentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loggedInUserName = localStorage.getItem('loggedInUserName') || '';

    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.getResident(id);
      this.getAllResidents();
    });
  }

  getResident(id: string): void {
    this.service.get(id).subscribe(
      (response: Resident) => {
        console.log('Residente encontrado:', response);
        this.selectedResident = response;
        this.selectedResidentId = response.id;
      },
      (error) => {
        console.error('Erro ao buscar residente:', error);
      }
    );
  }

  getAllResidents(): void {
    this.service.list().subscribe(
      (residents: Resident[]) => {
        console.log('Todos os residentes:', residents);
        this.residents = residents;
      },
      (error) => {
        console.error('Erro ao buscar todos os residentes:', error);
      }
    );
  }

  trackByPaymentId(index: number, payment: Payment): any {
    return payment.id; // Ou outro identificador único do pagamento, se aplicável
  }

  savePayment() {
    // Verificar se o statusPayment está entre as opções permitidas
    if (!this.statusOptions.includes(this.newBoleto.statusPayment)) {
      console.error('Status de pagamento inválido!');
      return;
    }

    // Preencher dados faltantes
    this.newBoleto.idResident = this.selectedResidentId;
    this.newBoleto.registryUser = this.loggedInUserName; // Atribuir o nome do usuário logado

    // Antes de enviar para o MongoDB, certifique-se de que valuePayment está como string
    this.newBoleto.valuePayment = this.newBoleto.valuePayment.toString(); // Garante que seja uma string

    this.paymentService.create(this.newBoleto).subscribe(
      (response: Payment) => {
        console.log('Boleto adicionado com sucesso!', response);
        this.boletos.push(response);
        this.clearForm();
      },
      (error) => {
        console.error('Erro ao adicionar boleto:', error);
      }
    );
  }

  clearForm() {
    // Limpar o formulário após adicionar o boleto
    this.newBoleto = {
      id: '',
      idResident: this.selectedResidentId,
      imagePayment: '',
      registryUser: '',
      numberPayment: '',
      valuePayment: '',
      statusPayment: 'Aberto', // Reinicializar o status se necessário
      datePayment: ''
    };
  }

    returnRoute(): void {
    this.router.navigate(['resident_data']);
  }

  cancelUpdate(): void {
    this.router.navigate(['/lista-residentes']);
  }

  formatValueToReal(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      const valorDigitado = inputElement.value;
      const parsedValue = parseFloat(valorDigitado.replace(',', '.')); // Substituir ',' por '.' antes de converter para float

      if (!isNaN(parsedValue)) {
        this.newBoleto.valuePayment = parsedValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      } else {
        console.error('Valor digitado inválido!');
      }
    }
  }


}
