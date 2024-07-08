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


  images: string[] = [
    'https://unsplash.it/640/425?image=30',
    'https://unsplash.it/640/425?image=40',
    'https://unsplash.it/640/425?image=50',
  ];

  carouselItems = [
    { src: 'https://unsplash.it/640/425?image=30' },
    { src: 'https://unsplash.it/640/425?image=40' },
    { src: 'https://unsplash.it/640/425?image=50' }
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
        this.news = data.articles.sort((a: any, b: any) => {
          const dateA = new Date(a.publishedAt);
          const dateB = new Date(b.publishedAt);
          return dateB.getTime() - dateA.getTime();
        });
        this.filterNewsLast10Days();
      },
      (error) => {
        console.error('Erro ao buscar notícias', error);
      }
    );
  }

  filterNewsLast10Days(): void {
    const today = new Date();
    const last10Days = new Date(today);
    last10Days.setDate(last10Days.getDate() - 5);
    this.news = this.news.filter((newsItem: any) => {
      const publishedAt = new Date(newsItem.publishedAt);
      return publishedAt >= last10Days;
    });
  }

  previous(): void {
    if (this.currentIndex > 1) {
      this.currentIndex -= 1;
    }
  }

  forward(): void {
    if (this.currentIndex < this.images.length) {
      this.currentIndex += 1;
    }
  }
}
