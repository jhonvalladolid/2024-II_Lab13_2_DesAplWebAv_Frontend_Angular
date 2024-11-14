import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarProductosComponent } from './components/listar-productos/listar-productos.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';

const routes: Routes = [
  { path: '', component: ListarProductosComponent },
  { path: 'clientes', component: ListarProductosComponent },
  { path: 'productos', component: ListarProductosComponent },
  { path: 'add-producto', component: CrearProductoComponent },
  { path: 'edit-producto/:id', component: CrearProductoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
