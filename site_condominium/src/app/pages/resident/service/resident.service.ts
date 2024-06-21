import { Resident } from './../model/resident';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ResidentService {

  private http = inject(HttpClient);

  list(){
    return this.http.get<Resident[]>('http://localhost:9001/api/residents');
  }

  get(id: string){
    return this.http.get<Resident>(`http://localhost:9001/api/residents/getId/${id}`);
  }

  create(client: Resident ){
    return this.http.post<Resident>('http://localhost:9001/api/residents', client);
  }

  update(id: string, client: Resident ){
    return this.http.put<Resident>(`http://localhost:9001/api/residents/${id}`, client);
  }

  delete(id: string){
    return this.http.delete<void>(`http://localhost:9001/api/residents/${id}`);
  }

}
export { Resident };

