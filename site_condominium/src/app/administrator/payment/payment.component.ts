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

  statusOptions: string[] = ['Aberto', 'Pendente', 'Atrasado'];

  selectedResident: Resident | null = null;
  selectedResidentId: string = ''; // Propriedade para armazenar o ID do residente selecionado
  newBoleto: Payment = {
    id: '',
    idResident: '',
    imagePayment: '',
    registryUser: '',
    numberPayment: '',
    valuePayment: '',
    statusPayment: 'Aberto', // Inicializar com uma opção padrão se necessário
    datePayment: ''
  };

  boletos: Payment[] = []; // Certifique-se de ajustar o tipo conforme seus dados

  constructor(
    private service: ResidentService,
    private paymentService: PaymentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loggedInUserName = localStorage.getItem('loggedInUserName') || ''; // Obtém o nome do usuário logado do armazenamento local

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
        this.selectedResidentId = response.id; // Supondo que o ID do residente esteja em _id
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

}
