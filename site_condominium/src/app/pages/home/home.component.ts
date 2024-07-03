import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NewsService } from './service/news.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive,
    FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',


})
export class HomeComponent implements OnInit {
  news: any[] = [];
  query: string = 'litoral norte SP';

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.getNews();
  }

  getNews(): void {
    this.newsService.getNews(this.query).subscribe(
      (data: any) => {
        this.news = data.articles;
      },
      (error) => {
        console.error('Erro ao buscar notícias', error);
      }
    );
  }





}

