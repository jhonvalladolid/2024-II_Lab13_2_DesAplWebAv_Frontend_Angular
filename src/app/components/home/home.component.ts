import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente/cliente.service';
import { ProductoService } from '../../services/producto/producto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dashboardData = {
    totalClientes: 0,
    totalProductos: 0,
    newClients: 0,
    newProduct: 0
  };

  constructor(
    private clienteService: ClienteService,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  fetchDashboardData(): void {
    // Obteniendo todos los clientes
    this.clienteService.obtenerTodosLosClientes().subscribe(
      (clientes) => {
        this.dashboardData.totalClientes = clientes.length;
        this.dashboardData.newClients = clientes.length;
      },
      (error) => {
        console.error('Error al obtener clientes:', error);
      }
    );
    
    // Obteniendo todos los productos
    this.productoService.obtenerTodosLosProductos().subscribe(
      (productos) => {
        this.dashboardData.totalProductos = productos.length;
        this.dashboardData.newProduct = productos.length; // Aquí puedes actualizar la lógica para productos recientes
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }
}
