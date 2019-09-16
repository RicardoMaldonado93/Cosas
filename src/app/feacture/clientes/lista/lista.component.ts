import { Component, OnInit, Output ,EventEmitter, Input} from '@angular/core';
import { ICliente } from 'src/app/model/interfaces/icliente';
import { ContratiemposServicioService } from 'src/app/contratiempos-servicio.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

 
  @Input() Clientes:ICliente[];
  @Output() ClienteSeleccionado:EventEmitter<any> = new EventEmitter<any>();
  error: string;
  
  constructor( private servicio: ContratiemposServicioService){}

  ngOnInit(){
    
    
  }
  Mostrar(Cliente:ICliente){
    this.ClienteSeleccionado.emit(Cliente);
  }
}
