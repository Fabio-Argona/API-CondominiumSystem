import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ResidentService } from '../resident/service/resident.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive, FormsModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  news: any[] = [];
  query: string = 'litoral norte SP';
  today: Date = new Date();
  currentIndex: number = 1;

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
        this.news = data.articles.sort((a: any, b: any) => {
          const dateA = new Date(a.publishedAt);
          const dateB = new Date(b.publishedAt);
          return dateB.getTime() - dateA.getTime();
        });
        this.filterLast4News();
      },
      (error) => {
        console.error('Erro ao buscar notícias', error);
      }
    );
  }

  // filterNewsLast10Days(): void {
  //   const today = new Date();
  //   const last10Days = new Date(today);
  //   last10Days.setDate(last10Days.getDate() - 10);
  //   this.news = this.news.filter((newsItem: any) => {
  //     const publishedAt = new Date(newsItem.publishedAt);
  //     return publishedAt >= last10Days;
  //   });
  // }

  filterLast4News(): void {
    // Ordenar as notícias pela data de publicação em ordem decrescente
    this.news.sort((a: any, b: any) => {
      const dateA = new Date(a.publishedAt);
      const dateB = new Date(b.publishedAt);
      return dateB.getTime() - dateA.getTime(); // Ordena em ordem decrescente
    });

    // Selecionar somente as quatro últimas notícias
    this.news = this.news.slice(0, 4);
  }


  previous(): void {
    if (this.currentIndex > 1) {
      this.currentIndex -= 1;
    }
  }


}
