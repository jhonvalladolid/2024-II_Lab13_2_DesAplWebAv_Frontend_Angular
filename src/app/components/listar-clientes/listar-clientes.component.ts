import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente/cliente.service';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ListarClientesComponent implements OnInit {
  clientes: any[] = [];
  searchTerm: string = '';
  filteredClientes: any[] = [];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.listarClientes();
  }

  listarClientes(): void {
    this.clienteService.obtenerTodosLosClientes().subscribe(
      (response) => {
        this.clientes = response;
        this.filteredClientes = response;
      },
      (error) => {
        console.error('Error al listar los clientes', error);
      }
    );
  }

  eliminarCliente(id: number): void {
    this.clienteService.eliminarCliente(id).subscribe(
      () => {
        this.listarClientes();
      },
      (error) => {
        console.error('Error al eliminar el cliente', error);
      }
    );
  }

  filtrarClientes(): void {
    if (this.searchTerm === '') {
      this.filteredClientes = this.clientes;
    } else {
      this.filteredClientes = this.clientes.filter(cliente =>
        cliente.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        cliente.apellidos.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
