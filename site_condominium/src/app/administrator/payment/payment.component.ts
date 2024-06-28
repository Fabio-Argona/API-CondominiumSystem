import { Component, NgModule, OnInit } from '@angular/core';
import { ResidentService } from '../../pages/resident/service/resident.service';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Resident } from '../../pages/resident/model/resident';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive, FormsModule],

  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  residents: Resident[] = [];
  selectedResident: Resident | null = null;
  newBoleto: any = {
    barcodeNumber: '',
    valuePayment: '',
    statusPayment: '',
    dateForPayment: ''
  };

  constructor(
    private service: ResidentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.getResident(id);
      this.getAllResidents();
    });
  }

  getResident(id: string): void {
    this.service.get(id).subscribe(
      (response: Resident) => {
        console.log('Residente encontrado:', response);
        this.selectedResident = response;
      },
      (error) => {
        console.error('Erro ao buscar residente:', error);
      }
    );
  }

  getAllResidents(): void {
    this.service.list().subscribe(
      (residents: Resident[]) => {
        console.log('Todos os residentes:', residents);
        this.residents = residents;
      },
      (error) => {
        console.error('Erro ao buscar todos os residentes:', error);
      }
    );
  }

  
  trackByPaymentId(index: number, payment: any): any {
    return payment.id; // Ou outro identificador único do pagamento, se aplicável
  }

  returnRoute(): void {
    this.router.navigate(['resident_data']);
  }

  cancelUpdate(): void {
    this.router.navigate(['/lista-residentes']);
  }

}
