import { Component, DEFAULT_CURRENCY_CODE, LOCALE_ID, OnInit } from '@angular/core';
import { ResidentService } from '../../pages/resident/service/resident.service';
import { Resident } from '../../pages/resident/model/resident';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-resident-data',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './resident-data.component.html',
  styleUrls: ['./resident-data.component.scss']
})
export class ResidentDataComponent implements OnInit {

  residents: Resident[] = [];

  constructor(
    private residentService: ResidentService,

  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  trackByResidentId(index: number, resident: Resident): string {
    return resident.id.toString(); // Certifique-se de converter para string se necessário
  }

  getColorClass(index: number): string {
    return index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200';
  }

  loadAll(): void {
    this.residentService.list().subscribe(residents => {
      this.residents = residents;
    });
  }

  deleteBoleto(resident: Resident): void {
    this.residentService.delete(resident.id).subscribe(() => {
      this.loadAll();
    });
  }

  editBoleto(resident: Resident): void {
    console.log('Editing boleto for resident:', resident);
    // Implemente a lógica para editar o residente aqui
  }

}
