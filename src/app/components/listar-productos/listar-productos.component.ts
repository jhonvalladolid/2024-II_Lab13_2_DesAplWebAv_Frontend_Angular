import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto/producto.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrl: './listar-productos.component.css'
})
export class ListarProductosComponent implements OnInit {
  productos: any[] = [];
  searchTerm: string = '';
  filteredProductos: any[] = [];

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.listarProductos();
  }

  listarProductos(): void {
    this.productoService.obtenerTodosLosProductos().subscribe(data => {
      this.productos = data;
      this.filteredProductos = data;
    }, error => {
      console.error('Error al obtener productos:', error);
    });
  }

  eliminarProducto(id: number): void {
    this.productoService.eliminarProducto(id).subscribe(response => {
      this.listarProductos();
    }, error => {
      console.error('Error al eliminar el producto:', error);
    });
  }

  filtrarProductos(): void {
    if (this.searchTerm === '') {
      this.filteredProductos = this.productos;
    } else {
      this.filteredProductos = this.productos.filter(producto =>
        producto.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
