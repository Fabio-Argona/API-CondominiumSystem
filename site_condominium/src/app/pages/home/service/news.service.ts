// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class NewsService {
//   private apiKey = 'a7118b7b41ab460e94db6c1d10c27436';
//   private apiUrl = 'https://newsapi.org/v2/everything';

//   constructor(private http: HttpClient) {}

//   getNews(query: string): Observable<any> {
//     const url = `${this.apiUrl}?q=${query}&apiKey=${this.apiKey}`;
//     return this.http.get<any>(url);
//   }
// }
