import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {
  clienteForm: FormGroup;
  id: number | null;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : null;
  }

  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente(): void {
    if (this.id !== null) {
      this.clienteService.obtenerClientePorId(this.id).subscribe(
        data => {
          this.clienteForm.setValue({
            nombre: data.nombre,
            apellidos: data.apellidos,
            email: data.email
          });
        },
        error => {
          console.error('Error al cargar el cliente', error);
        }
      );
    }
  }

  saveOrUpdateCliente(): void {
    const cliente = this.clienteForm.value;

    if (this.id !== null) {
      // Actualizar cliente existente
      this.clienteService.actualizarCliente(this.id, cliente).subscribe(
        () => {
          this.router.navigate(['/clientes']);
        },
        error => {
          console.error('Error al actualizar el cliente', error);
        }
      );
    } else {
      // Crear nuevo cliente
      this.clienteService.agregarCliente(cliente).subscribe(
        () => {
          this.router.navigate(['/clientes']);
        },
        error => {
          console.error('Error al crear el cliente', error);
        }
      );
    }
  }
}
