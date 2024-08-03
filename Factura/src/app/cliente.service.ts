import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ClienteService {


  url = 'http://localhost:3000';

  constructor(public http: HttpClient) {
  }

  //funcion para captar los datos del web service consultra cliente por cedula
  getClientByCedula(cedula: string) {
    return new Promise((resolve) => {
      this.http.get(this.url + '/cliente/' + cedula)
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
    });
  }

  //funcion para captar los dato s y enviarlos al web service para registrar un cliente
  saveCliente(data: any) {
    return new Promise((resolve) => {
      this.http.post(this.url + '/cliente/', data)
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
    });
  }

  //obtener clientesy mostrarlos en un atabla
  getAllClients() {
    return new Promise((resolve) => {
      this.http.get(this.url + '/cliente/')
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
    });

  }


  eliminarCliente(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete(this.url + '/cliente/' + id)
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }

//funcion para obtener cliente por el id
  /*getClientById(id: string) {
    return new Promise((resolve) => {
      this.http.get(this.url + '/cliente_id/' + id)
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
    });

  }*/
  getClientById(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/cliente_id/${id}`)
        .subscribe(
          data => resolve(data),
          err => reject(err)
        );
    });
  }


  //funcion para actualizar cliente por el id
  updateCliente(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(`${this.url}/clienteeditar/${data.idcliente}`, data)
        .subscribe(
          response => resolve(response),
          err => reject(err)
        );
    });
  }

}
