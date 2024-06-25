import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Resident } from '../../resident/model/resident';
import { map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ResidentService {


  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Resident[]>('http://localhost:9001/api/residents');
  }

  get(id: string) {
    return this.http.get<Resident>(`http://localhost:9001/api/residents/getId/${id}`);
  }

  create(resident: Resident) {
    return this.http.post<Resident>('http://localhost:9001/api/residents', resident);
  }

  update(id: string, resident: Resident) {
    return this.http.put<Resident>(`http://localhost:9001/api/residents/${id}`, resident);
  }

  delete(id: string) {
    return this.http.delete<void>(`http://localhost:9001/api/residents/${id}`);
  }

  
}
