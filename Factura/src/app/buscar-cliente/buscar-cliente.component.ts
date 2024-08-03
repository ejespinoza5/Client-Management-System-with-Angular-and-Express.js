import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ClienteService} from "../cliente.service";
import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-buscar-cliente',
  standalone: true,
  imports: [FormsModule,HttpClientModule],
  providers: [ClienteService],
  templateUrl: './buscar-cliente.component.html',
  styleUrl: './buscar-cliente.component.css'
})
export class BuscarClienteComponent {
public cliente:any;
public nombre ="";
public cedula ="";
public telefono ="";
public direccion="";
public correo="";

constructor(public clienteService: ClienteService) {

}
async getUsuariobyCedula(){
  try {
    this.cliente = await this.clienteService.getClientByCedula(this.cedula);
    this.nombre = this.cliente[0].nombrecliente;
    this.telefono = this.cliente[0].telefonocliente;
    this.direccion = this.cliente[0].direccioncliente;
    this.correo = this.cliente[0].correocliente;

  }catch (e) {
    console.log(e);
  }
}
}
