import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseUrl = 'http://localhost:8080/api/v1/clientes';

  constructor(private httpClient: HttpClient) { }

  obtenerTodosLosClientes(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}`);
  }

  obtenerClientePorId(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }

  agregarCliente(cliente: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}`, cliente);
  }

  actualizarCliente(id: number, cliente: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/${id}`, cliente);
  }

  eliminarCliente(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
}
