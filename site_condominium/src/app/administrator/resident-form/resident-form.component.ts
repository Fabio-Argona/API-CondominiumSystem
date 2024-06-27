import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ResidentService } from '../../pages/resident/service/resident.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Resident } from '../../pages/resident/model/resident';

import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-resident-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './resident-form.component.html',
  styleUrls: ['./resident-form.component.scss']
})
export class ResidentFormComponent implements OnInit {
CreatePayment() {
this.router.navigate(['/payment'])
}

formTouched: any;
onSubmit() {

  throw new Error('Method not implemented.');
}

residents: Resident[] = []

  resident: Resident | null = null;

  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private service: ResidentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
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

  trackByResidentId(index: number, resident: any): number {
    return resident.id;
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

  returnRoute() {

    this.router.navigate(['/owner']);
  }

  cancelUpdate(): void {
    this.router.navigate(['/lista-residentes']);
  }

}
