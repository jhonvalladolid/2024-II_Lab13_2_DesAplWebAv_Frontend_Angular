import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarProductosComponent } from './components/listar-productos/listar-productos.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { ListarClientesComponent } from './components/listar-clientes/listar-clientes.component';
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'clientes', component: ListarClientesComponent },
  { path: 'crear-cliente', component: CrearClienteComponent },
  { path: 'editar-cliente/:id', component: CrearClienteComponent },
  { path: 'productos', component: ListarProductosComponent },
  { path: 'add-producto', component: CrearProductoComponent },
  { path: 'edit-producto/:id', component: CrearProductoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
