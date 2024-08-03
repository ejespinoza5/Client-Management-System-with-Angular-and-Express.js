import {Component, OnInit, ViewChild} from '@angular/core';
import {ClienteService} from "../cliente.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import Swal from 'sweetalert2';
import {ModalModule} from "ngx-bootstrap/modal";
import {Router} from "@angular/router"; // Importa Router desde @angular/router en lugar de express

@Component({
  selector: 'app-listar-cliente',
  standalone: true,
  imports: [
    FormsModule, HttpClientModule, CommonModule, ModalModule
  ],
  providers: [ClienteService],
  templateUrl: './listar-cliente.component.html',
  styleUrl: './listar-cliente.component.css'
})
export class ListarClienteComponent{

    public clientes: any = [];


    constructor(private clienteService: ClienteService, private router: Router) {
      this.getClientes();
    }

    async getClientes() {
      try {
        this.clientes = await this.clienteService.getAllClients();
      } catch (e) {
        console.log("ocurrio un error",e);
      }
    }

  async eliminarCliente(id: string) {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await this.clienteService.eliminarCliente(id);
        Swal.fire(
          'Eliminado',
          'El cliente ha sido eliminado.',
          'success'
        );
        // Aquí puedes actualizar la lista de clientes después de eliminar uno
        this.getClientes();
      } catch (e) {
        Swal.fire(
          'Error',
          'Ocurrió un error al eliminar el cliente',
          'error'
        );
        console.log('Ocurrió un error al eliminar el cliente', e);
      }
    }
  }

  editarCliente(id: string) {
    this.router.navigate(['/editarCliente', id]);
  }


}
