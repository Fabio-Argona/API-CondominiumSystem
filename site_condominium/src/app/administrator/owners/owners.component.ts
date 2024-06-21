import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { Resident_ownerService } from './service/resident_owner.service';
import { Resident, ResidentService } from '../../pages/resident/service/resident.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-owners',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OwnersComponent implements OnInit {

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
