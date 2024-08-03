import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ClienteService} from "../cliente.service";
import {HttpClientModule} from "@angular/common/http";
import Swal from "sweetalert2";

@Component({
  selector: 'app-insertar-cliente',
  standalone: true,
  imports: [
    FormsModule, HttpClientModule
  ],
  providers: [ClienteService],
  templateUrl: './insertar-cliente.component.html',
  styleUrl: './insertar-cliente.component.css'
})
export class InsertarClienteComponent {

  public cedula: string = "";
  public nombre: string = "";
  public direccion: string = "";
  public telefono: string = "";
  public correo: string = "";

  constructor(public clienteService: ClienteService) {

  }

  async saveClienteOnBDD() {
    try {
      let newClient = this.buildAndGetNewClientObject();
      await this.clienteService.saveCliente(newClient);
      Swal.fire({
        icon: 'success',
        title: 'Cliente guardado',
        text: 'El cliente se ha guardado correctamente.',
        confirmButtonText: 'Aceptar'
      });
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al guardar el cliente.',
        confirmButtonText: 'Aceptar'
      });
      console.log("Ocurrió un error", e);
    }
  }

  buildAndGetNewClientObject(){
    let newClient = {
      nombrecliente: this.nombre,
      cedulacliente: this.cedula,
      direccioncliente: this.direccion,
      telefonocliente: this.telefono,
      correocliente: this.correo
    }
    return newClient;
  }
}



