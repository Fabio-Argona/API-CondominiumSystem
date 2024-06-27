import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Resident } from '../../resident/model/resident';

@Injectable({
  providedIn: 'root'
})
export class ResidentService {

  private baseUrl = 'http://localhost:9001/api/residents';

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

  getAllResidents(): Observable<Resident[]> {
    return this.http.get<Resident[]>(`${this.baseUrl}`);
  }

}
