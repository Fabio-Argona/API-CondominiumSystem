import { Component, OnInit } from '@angular/core';
import { Resident } from './model/resident';
import { ResidentService } from './service/resident.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-resident',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './resident.component.html',
  styleUrls: ['./resident.component.scss']
})
export class ResidentComponent implements OnInit {
  resident: Resident | null = null;

  constructor(
    private service: ResidentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadResident();
  }

  loadResident(): void {
    const residentId = localStorage.getItem('loggedInUserId');
    if (residentId) {
      this.service.get(residentId).subscribe(
        (data: Resident) => {
          this.resident = data;
        },
        error => {
          console.error('Error loading resident data', error);
        }
      );
    } else {
      console.error('No resident ID found in localStorage');
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

  isPaymentDateAfterToday(paymentDate: string): boolean {
    const today = new Date();
    const dateForPayment = new Date(paymentDate);
    return dateForPayment > today;
  }

  editDataResident(resident: Resident): void {
    console.log('Editing boleto for resident:', resident);

    // Remover o campo `orderItemsAsString` antes de enviar a requisição
    const residentToUpdate = { ...resident };
    delete (residentToUpdate as any).orderItemsAsString;

    this.service.update(resident.id, residentToUpdate).subscribe(
      (updatedResident) => {
        console.log('Resident updated successfully:', updatedResident);
        // Aqui você pode adicionar lógica para exibir uma mensagem de sucesso ou navegar para outra página
      },
      (error) => {
        console.error('Error updating resident:', error);
        // Aqui você pode adicionar lógica para exibir uma mensagem de erro
      }
    );
  }

  onSubmit(): void {
    this.updateResident();
  }


}



