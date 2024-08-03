import { Routes } from '@angular/router';
import {BuscarClienteComponent} from "./buscar-cliente/buscar-cliente.component";
import {InsertarClienteComponent} from "./insertar-cliente/insertar-cliente.component";
import {ListarClienteComponent} from "./listar-cliente/listar-cliente.component";
import {EditarClienteComponent} from "./editar-cliente/editar-cliente.component";


export const routes: Routes = [
  {path: 'buscarCliente', component: BuscarClienteComponent, pathMatch: 'full'},
  {path: 'insertarCliente', component: InsertarClienteComponent, pathMatch: 'full'},
  {path: 'listarCliente', component: ListarClienteComponent, pathMatch: 'full'},
  { path: 'editarCliente/:id', component: EditarClienteComponent }
];
