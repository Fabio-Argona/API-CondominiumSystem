import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ResidentService } from '../resident/service/resident.service';
import { Resident } from '../resident/model/resident';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],  // Ajuste a importação para ser uma lista
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']  // Corrija o nome para 'styleUrls'
})
export class LoginComponent{
  email: string = '';
  password: string = '';
  resident: Resident | undefined; // Variável para armazenar os dados do residente

  constructor(private residentService: ResidentService, private router: Router) {}

  ValidateLogin() {
    if (!this.email || !this.password) {
      console.log('Email and password are required.');
      return;
    }

    // Chama o serviço para buscar todas as informações do residente pelo email
    this.residentService.getUserByEmail(this.email).subscribe(
      (resident) => {
        if (resident) {
          // Verifica se a senha digitada corresponde à senha armazenada
          if (resident.password === this.password) {
            // Login bem sucedido
            console.log('Login successful!');

            // Armazena o ID e o nome do usuário logado no localStorage
            localStorage.setItem('loggedInUserId', resident.id);
            localStorage.setItem('loggedInUserName', resident.nomeCompleto);

            // Você pode navegar para uma página de dashboard ou outra página aqui
            this.router.navigate(['/home']);
          } else {
            // Senha incorreta
            console.log('Incorrect password.');
            // Lógica para lidar com senha incorreta
          }
        } else {
          // Email não encontrado
          console.log('Email does not exist.');
          // Lógica para lidar com email não encontrado
        }
      },
      (error) => {
        console.error('Error checking email:', error);
        // Lógica para lidar com erro de API
      }
    );
  }
}
