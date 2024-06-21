import { Component, DEFAULT_CURRENCY_CODE, LOCALE_ID, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { Resident_ownerService } from '../../administrator/owners/service/resident_owner.service';
import { Resident, ResidentService } from '../../pages/resident/service/resident.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-resident-data',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    CurrencyPipe,
  ],
  templateUrl: './resident-data.component.html',
  styleUrl: './resident-data.component.scss'
})
export class ResidentDataComponent implements OnInit {

  constructor(private resident_ownerService: Resident_ownerService) {}

  private residentService = inject(ResidentService);

  residents: Resident[] = [];


  ngOnInit(): any {
    this.loadAll();
  }

  trackByResidentId(index: number, resident: any): number {
    return resident.id;
  }

  getColorClass(index: number): string {
    // Lógica para determinar a classe de cor
    return index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200';
  }

  loadAll(){
    this.residentService.list()
    .subscribe(residents => {
      this.residents = residents;
    })
  }

  deleteBoleto(resident: Resident) {
    this.residentService.delete(resident.id)
    .subscribe(() => {
      this.loadAll();
    });
  }
  
  editBoleto(resident: any): void {
    console.log('Editing boleto for resident:', resident);
    // Adicione a lógica para editar o boleto aqui
  }


}
