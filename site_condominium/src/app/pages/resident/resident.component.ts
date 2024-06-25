import { Component, OnInit } from '@angular/core';
import { Resident } from './model/resident';
import { ResidentService } from './service/resident.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-resident',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './resident.component.html',
  styleUrl: './resident.component.scss'
})
export class ResidentComponent implements OnInit {
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
export { ResidentService };
