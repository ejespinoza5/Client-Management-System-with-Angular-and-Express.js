import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ClienteService} from "../cliente.service";
import Swal from "sweetalert2";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-editar-cliente',
  standalone: true,
  imports: [
    FormsModule,HttpClientModule, CommonModule],
  providers: [ClienteService],
  templateUrl: './editar-cliente.component.html',
  styleUrl: './editar-cliente.component.css'
})
export class EditarClienteComponent implements OnInit {
  cliente: any = {};

  constructor(
    private route: ActivatedRoute,
    private clienteService: ClienteService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCliente();
  }

  loadCliente() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.clienteService.getClientById(id).then(data => {
        this.cliente = Array.isArray(data) ? data[0] : data;
      }).catch(err => {
        console.error('Error al cargar el cliente', err);
        Swal.fire('Error', 'No se pudo cargar el cliente', 'error');
      });
    }
  }

  updateCliente() {
    this.clienteService.updateCliente(this.cliente).then(() => {
      this.router.navigate(['/listarCliente']);
      Swal.fire('Éxito', 'Cliente actualizado correctamente', 'success');

    }).catch(err => {
      console.error('Error al actualizar el cliente', err);
      Swal.fire('Error', 'No se pudo actualizar el cliente', 'error');
    });
  }
}
