import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  id: number | null;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      precio: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
    });
    
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : null; // Convertir id a number si es necesario
  }

  ngOnInit(): void {
    this.cargarProducto();
  }

  cargarProducto(): void {
    if (this.id !== null) {
      this.productoService.obtenerProductoPorId(this.id).subscribe(
        data => {
          this.productoForm.setValue({
            nombre: data.nombre,
            descripcion: data.descripcion,
            precio: data.precio,
            stock: data.stock,
            fechaCreacion: data.fechaCreacion,
            ultimaActualizacion: data.ultimaActualizacion
          });
        },
        error => {
          console.error('Error al cargar el producto', error);
        }
      );
    }
  }

  saveOrUpdateProducto(): void {
    const producto = this.productoForm.value;

    if (this.id !== null) {
      // Actualizar producto existente
      this.productoService.actualizarProducto(this.id, producto).subscribe(
        () => {
          this.router.navigate(['/productos']);
        },
        error => {
          console.error('Error al actualizar el producto', error);
        }
      );
    } else {
      // Crear nuevo producto
      this.productoService.agregarProducto(producto).subscribe(
        () => {
          this.router.navigate(['/productos']);
        },
        error => {
          console.error('Error al crear el producto', error);
        }
      );
    }
  }
}
