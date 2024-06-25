import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ResidentService } from '../../pages/resident/service/resident.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Resident } from '../../pages/resident/model/resident';

import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-resident-form',
  standalone: true,
  imports: [ CommonModule, FormsModule, RouterModule],
  templateUrl: './resident-form.component.html',
  styleUrls: ['./resident-form.component.scss']
})
export class ResidentFormComponent implements OnInit {
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


  cancelUpdate(): void {
    this.router.navigate(['/lista-residentes']);
  }

}
