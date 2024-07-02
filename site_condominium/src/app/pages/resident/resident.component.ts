import { Component, OnInit } from '@angular/core';
import { Resident } from './model/resident';
import { ResidentService } from './service/resident.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../administrator/payment/service/payment.service';
import { Payment } from '../../administrator/payment/model/payment';

@Component({
  selector: 'app-resident',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './resident.component.html',
  styleUrls: ['./resident.component.scss']
})
export class ResidentComponent implements OnInit {
  resident: Resident | null = null;
  payment: Payment[] = [];
  payments: Payment[] = [];
  today: Date = new Date();

  constructor(
    private service: ResidentService,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadResident();
    this.loadPayments(); // Carrega os dados do pagamento ao inicializar o componente
  }

  loadResident(): void {
    const residentId = localStorage.getItem('loggedInUserId');
    if (residentId) {
      this.service.get(residentId).subscribe(
        (data: Resident) => {
          this.resident = data;
        },
        error => {
          console.error('Erro ao carregar dados do residente', error);
        }
      );
    } else {
      console.error('Nenhum ID de residente encontrado no localStorage');
    }
  }


  loadPayments(): void {
    const residentId = localStorage.getItem('loggedInUserId');
    if (residentId) {
      this.paymentService.getResidentPayment(residentId).subscribe(
        (data: Payment[]) => {  // 'data' é do tipo Payment[]
          console.log('Dados do pagamento recebidos do banco:', data);
          this.payments = data;  // Atribui o array de pagamentos à variável 'payments'
        },
        error => {
          console.error('Erro ao carregar dados do pagamento', error);
        }
      );
    } else {
      console.error('Nenhum ID de residente encontrado no localStorage para carregar pagamento');
    }
  }

  updateResident(): void {
    if (this.resident) {
      console.log('Dados do residente a serem enviados:', this.resident);
      this.service.update(this.resident.id, this.resident).subscribe(
        (data: Resident) => {
          console.log('Residente atualizado com sucesso', data);
        },
        error => {
          console.error('Erro ao atualizar residente', error);
        }
      );
    } else {
      console.error('Não há dados do residente para atualizar');
    }
  }

  editDataResident(resident: Resident): void {
    console.log('Editando dados do residente:', resident);

    const residentToUpdate = { ...resident };
    delete (residentToUpdate as any).orderItemsAsString;

    this.service.update(resident.id, residentToUpdate).subscribe(
      (updatedResident) => {
        console.log('Residente atualizado com sucesso:', updatedResident);
      },
      (error) => {
        console.error('Erro ao atualizar residente:', error);
      }
    );
  }

  onSubmit(): void {
    this.updateResident();
  }

  transformStringToDate(dateString: string): Date {
    return new Date(dateString);
  }
}

