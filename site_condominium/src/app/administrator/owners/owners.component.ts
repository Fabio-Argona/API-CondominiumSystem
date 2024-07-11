import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { ResidentService } from '../../pages/resident/service/resident.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Resident } from '../../pages/resident/model/resident';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { SearchfilterPipe } from './service/searchfilter.pipe';

@Component({
  selector: 'app-owners',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive, NgxPaginationModule, FormsModule, SearchfilterPipe],
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OwnersComponent implements OnInit {

  residents: Resident[] = [];
  searchValue: string = '';
  totalLength: number = 0;
  page: number = 1;

  constructor(private router: Router) {}

  private residentService = inject(ResidentService);

  ngOnInit(): void {
    this.loadAll();
  }

  trackByResidentId(index: number, resident: any): number {
    return resident.id;
  }

  getColorClass(index: number): string {
    return index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200';
  }

  loadAll(): void {
    this.residentService.list()
    .subscribe(residents => {
      this.residents = residents;
      this.totalLength = residents.length; // ou definir o total real dos itens se disponível na resposta da API
    });
  }

  CreatePayment() {
    this.router.navigate(['/payment'])
  }

  deleteResident(resident: Resident): void {
    this.residentService.delete(resident.id)
    .subscribe(() => {
      this.loadAll();
    });
  }

  editResident(resident: Resident): void {
    console.log('Editing resident:', resident);
    // Adicione a lógica para editar o residente aqui
  }

  CreateResidentPage() {
    this.router.navigate(['/resident-form-add'])
  }
}

