import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ResidentService } from '../../pages/resident/service/resident.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Resident } from '../../pages/resident/model/resident';

import { FormsModule } from '@angular/forms';
import { Payment } from '../payment/model/payment';
import { PaymentService } from '../payment/service/payment.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';


@Component({
  selector: 'app-resident-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NgxMaskDirective],
  templateUrl: './resident-form.component.html',
  styleUrls: ['./resident-form.component.scss'],
  providers: [
    provideNgxMask(),
],
})
export class ResidentFormComponent implements OnInit {

payments: Payment[] = [];

CreatePayment() {
  this.router.navigate(['/payment'])
}

formTouched: any;

residents: Resident[] = []
resident: Resident | null = null;
today: Date = new Date();
imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private service: ResidentService,
    private paymentService: PaymentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.getResident(id);
      this.loadPayments(id); // Corrigido para passar o id do residente para loadPayments
    });
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.getResident(id);
    });
  }

  getResident(id: string): void {
    this.service.get(id).subscribe(
      (response: Resident) => {
        console.log('Residente encontrado:', response);
        this.resident = response;
      },
      (error) => {
        console.error('Erro ao buscar residente:', error);
      }
    );
  }

  loadPayments(idResident: string): void {
    this.paymentService.getResidentPayment(idResident).subscribe(
      (data: Payment[]) => {
        console.log('Dados do pagamento recebidos do banco:', data);
        this.payments = data;  // Atribui o array de pagamentos à variável 'payments'
      },
      error => {
        console.error('Erro ao carregar dados do pagamento', error);
      }
    );
  }

  updateResidentAdm(): void {
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
    this.updateResidentAdm();
  }

  transformStringToDate(dateString: string): Date {
    return new Date(dateString);
  }

  trackByResidentId(index: number, resident: any): number {
    return resident.id;
  }


  returnRoute() {

    this.router.navigate(['/owner']);
  }

  cancelUpdate(): void {
    this.router.navigate(['/lista-residentes']);
  }

}
