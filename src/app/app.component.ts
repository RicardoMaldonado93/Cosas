import { Component } from '@angular/core';
import { ICliente } from './model/interfaces/icliente';
import { ContratiemposServicioService } from './contratiempos-servicio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Contratiempos';

  clienteParaMostrar:ICliente;
  listadoClientes:ICliente[];

  constructor( private servicio:ContratiemposServicioService){}

  ngOnInit(){
    this.servicio.clientesRegistrados().subscribe(
      (res: ICliente[]) =>{
        this.listadoClientes = res;    
      })
  }
  MostrarDetalleCliente(NuevoCliente:ICliente){
    this.clienteParaMostrar = NuevoCliente;
  }

}
