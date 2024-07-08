import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Resident } from '../../resident/model/resident';

@Injectable({
  providedIn: 'root'
})
export class ResidentService {

  private baseUrl = 'http://localhost:9001/api/residents';

  private apiKey = 'a7118b7b41ab460e94db6c1d10c27436';
  private apiUrl = 'https://newsapi.org/v2/everything';

  constructor(private http: HttpClient) {}

  list(): Observable<Resident[]> {
    return this.http.get<Resident[]>(`${this.baseUrl}`);
  }

  get(id: string): Observable<Resident> {
    return this.http.get<Resident>(`${this.baseUrl}/getId/${id}`);
  }

  create(resident: Resident): Observable<Resident> {
    return this.http.post<Resident>(`${this.baseUrl}`, resident);
  }

  update(id: string, resident: Resident): Observable<Resident> {
    return this.http.put<Resident>(`${this.baseUrl}/${id}`, resident);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getUserByEmail(email: string): Observable<Resident> {
    return this.http.get<Resident>(`${this.baseUrl}/getEmail/${email}`);
  }

  getNews(query: string): Observable<any> {
    const url = `${this.apiUrl}?q=${query}&apiKey=${this.apiKey}`;
    return this.http.get<any>(url);
  }

}
