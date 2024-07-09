import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ResidentService } from '../../pages/resident/service/resident.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Resident } from '../../pages/resident/model/resident';
import { FormsModule } from '@angular/forms';
import { Payment } from '../payment/model/payment';
import { PaymentService } from '../payment/service/payment.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-resident-form-add',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NgxMaskDirective],
  templateUrl: './resident-form-add.component.html',
  styleUrls: ['./resident-form-add.component.scss'],
  providers: [
    provideNgxMask(),
],
})
export class ResidentFormAddComponent implements OnInit {

  payments: Payment[] = [];
  residents: Resident[] = [];
  resident: Resident;
  today: Date = new Date();
  imagePreview: string | ArrayBuffer | null = null;

  estados: string[] = ['Solteiro', 'Casado'];

  constructor(
    private service: ResidentService,
    private paymentService: PaymentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.resident = this.initializeResident();
  }

  ngOnInit(): void {
    // this.createResident();
  }

  initializeResident(): Resident {
    return {
      id: '',
      unidade: '',
      nomeCompleto: '',
      dataNascimento: '',
      user: '',
      estadoCivil: '',
      email: '',
      telefone: '',
      enderecoCorrespondencia: 'Avenida Minas Gerais, 1481',
      documentoIdentidade: '',
      cpf: '',
      password: '',
      fotoUrl: '',
      dataInicioResidencia: '',
      statusResidencia: '',
      numeroMoradoresUnidade: 1,
      placaVeiculo: '',
      modeloVeiculo: '',
      corVeiculo: '',
      vagaEstacionamento: '',
      preferenciasContato: '',
      observacoes: '',
      registryUser: '',
    };
  }

  createResident() {
    this.service.create(this.resident).subscribe(
      (result) => {
        console.log('Residente criado com sucesso:', result);
        // Limpar o formulário ou redirecionar após criação bem-sucedida
        this.router.navigate(['/owner']);
      },
      (error) => {
        console.error('Erro ao criar residente:', error);
        // Exibir mensagem de erro no console
        console.error('Detalhes do erro:', error);

        // Tratar o erro adequadamente, como exibir uma mensagem ao usuário
        // Por exemplo, você pode definir uma propriedade no componente para armazenar a mensagem de erro e exibi-la no template
        // this.errorMessage = 'Ocorreu um erro ao criar o residente. Por favor, tente novamente mais tarde.';
      }
    );
  }

  transformToTitleCase(value: string) {
    this.resident.nomeCompleto = value.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }


}
