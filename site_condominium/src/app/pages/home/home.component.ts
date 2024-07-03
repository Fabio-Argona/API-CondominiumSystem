import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ResidentService } from '../resident/service/resident.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  news: any[] = [];
  query: string = 'litoral norte SP';
  today: Date = new Date();

  carouselItems = [
    { src: 'assets/carousel/carousel-1.jpg' },
    { src: 'assets/carousel/carousel-2.PNG' },
    { src: 'assets/carousel/carousel-3.PNG' }
  ];

  constructor(private residentService: ResidentService) {}

  ngOnInit(): void {
    this.getNews();
  }

  getMonthFullName(): string {
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril',
      'Maio', 'Junho', 'Julho', 'Agosto',
      'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return months[this.today.getMonth()];
  }

  getNews(): void {
    this.residentService.getNews(this.query).subscribe(
      (data: any) => {
        // Ordenar as notícias do mais recente para o mais antigo
        this.news = data.articles.sort((a: any, b: any) => {
          const dateA = new Date(a.publishedAt);
          const dateB = new Date(b.publishedAt);
          return dateB.getTime() - dateA.getTime();
        });

        // Filtrar as notícias dos últimos 10 dias
        this.filterNewsLast10Days();
      },
      (error) => {
        console.error('Erro ao buscar notícias', error);
      }
    );
  }

  filterNewsLast10Days(): void {
    // Calcular a data dos últimos 10 dias
    const today = new Date();
    const last10Days = new Date(today);
    last10Days.setDate(last10Days.getDate() - 10);

    // Filtrar as notícias baseadas na data de publicação
    this.news = this.news.filter((newsItem: any) => {
      const publishedAt = new Date(newsItem.publishedAt);
      return publishedAt >= last10Days;
    });
  }
}
