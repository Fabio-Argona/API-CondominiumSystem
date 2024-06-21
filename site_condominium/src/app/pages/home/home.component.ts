import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ResidentService } from '../resident/service/resident.service';
import { Resident } from '../resident/model/resident';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private residentService = inject(ResidentService);

  residents: Resident[] = [];


  ngOnInit(): any {
    this.loadAll();
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




}

