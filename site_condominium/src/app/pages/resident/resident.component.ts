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
  resident: Resident | undefined;

  constructor(
    private residentService: ResidentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadResident();
  }

  loadResident(): void {
    const residentId = localStorage.getItem('loggedInUserId');
    if (residentId) {
      this.residentService.get(residentId).subscribe(
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
      this.residentService.update(this.resident.id, this.resident).subscribe(
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


  onSubmit(): void {
    this.updateResident();
  }


}



