import { Resident_owner } from '../model/resident_owner';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Resident_ownerService {

  private apiUrl = 'http://localhost:9001/api/residents';

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Resident_owner[]>('this.apiUrl');
  }

  get(id: string) {
    return this.http.get<Resident_owner>(`this.apiUrl/getId/${id}`);
  }

  create(client: Resident_owner) {
    return this.http.post<Resident_owner>('this.apiUrl', client);
  }

  update(id: string, client: Resident_owner) {
    return this.http.put<Resident_owner>(`this.apiUrl/${id}`, client);
  }

  delete(id: string) {
    return this.http.delete<void>(`this.apiUrl/${id}`);
  }

}
