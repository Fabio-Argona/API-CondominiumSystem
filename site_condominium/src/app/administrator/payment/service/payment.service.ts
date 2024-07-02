import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../model/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = 'http://localhost:9002/api/payments';

  constructor(private http: HttpClient) {}

  list(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.baseUrl}`);
  }

  get(id: string): Observable<Payment> {
    return this.http.get<Payment>(`${this.baseUrl}/getId/${id}`);
  }

  getResidentPayment(idResident: string): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.baseUrl}/getIdResident/${idResident}`);
  }

  create(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(`${this.baseUrl}`, payment);
  }

  update(id: string, payment: Payment): Observable<Payment> {
    return this.http.put<Payment>(`${this.baseUrl}/${id}`, payment);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
