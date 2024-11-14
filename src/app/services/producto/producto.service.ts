import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private baseUrl = 'http://localhost:8080/api/v1/productos';

  constructor(private httpClient: HttpClient) { }

  obtenerTodosLosProductos(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}`);
  }

  obtenerProductoPorId(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }

  agregarProducto(producto: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}`, producto);
  }

  actualizarProducto(id: number, producto: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/${id}`, producto);
  }

  eliminarProducto(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
}
