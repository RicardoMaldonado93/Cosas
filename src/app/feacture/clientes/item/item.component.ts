import { Component, OnInit, Input } from '@angular/core';
import { ContratiemposServicioService } from 'src/app/contratiempos-servicio.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ICliente } from 'src/app/model/interfaces/icliente';
import { VALID } from '@angular/forms/src/model';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  inscripcion: FormGroup;
  modificable: boolean;
  @Input() clienteParaMostrar:ICliente;

  constructor( private _route : ActivatedRoute, private fb:FormBuilder, private service: ContratiemposServicioService) { 
 
    this.inscripcion = new FormGroup({
      
      nombre: new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      razon_social: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      cuit: new FormControl('', [Validators.required]),
      direccion: new FormControl('',[ Validators.compose([Validators.required])]),
      email : new FormControl('',[ Validators.required]),
      telefono: new FormControl('', [ Validators.minLength(8), Validators.pattern('[0-9]*')]),
        
      });

      
  }

  ngOnInit() {  
    
    
  }


  onSubmit(value){

    let cliente = {
      nombre: value.nombre,
      cuit: value.cuit,
      razon_social: value.razon_social,
      direccion: value.direccion,
      email: value.email,
      telefono: value.telefono,
    }

        this.service.registrarCliente(cliente).subscribe((m)=> { 
          if(m.status!=200)
            alert(m.msg.errorInfo[2]); 
          if(m.status==200) {
            this.inscripcion.reset({});
            window.location.reload();
            alert(m.msg);
          }
        }); 
  }

  mostrarFormulario(){
    
    this.clienteParaMostrar = null;
    
  }

  eliminarRegistro(){
    if (confirm('Estas seguro que quieres borrar este registro?')) {
      this.service.eliminarCliente(this.clienteParaMostrar.id).subscribe((m) => {
        if(m.status!=200)
          alert(m.msg.errorInfo[2]); 
        if(m.status==200) {
          location.reload();
          alert(m.msg);
        }
      });
  } else {
      // Do nothing!
  }
   
  }

  onSubmitModificar(value : ICliente, id){

  
    let cliente = this.service.Clientes.find(resp=> resp.id == id);
    this.inscripcion.setValue({
      
      nombre: cliente.nombre,
      razon_social: cliente.razon_social,
      cuit: cliente.cuit,
      direccion: cliente.direccion,
      email : cliente.email,
      telefono: cliente.telefono,

    });
    
    if(value.nombre != '')
        this.inscripcion.patchValue({'nombre' : value.nombre, }); 
      
    if(value.razon_social != '')
      this.inscripcion.patchValue({'razon_social':value.razon_social})
    
    if(value.cuit != '')
    this.inscripcion.patchValue({'cuit' : value.cuit, }); 
    
    if(value.direccion != '')
      this.inscripcion.patchValue({'direccion':value.direccion})

     
    if(value.email != '')
    this.inscripcion.patchValue({'email' : value.email, }); 
    
    if(value.telefono != '')
      this.inscripcion.patchValue({'telefono':value.telefono})
  
    
    cliente = this.inscripcion.value;
    cliente.id = id;

    console.log(cliente);

    if (confirm('Estas seguro que quieres modificar este registro?')) {
      this.service.modificarCliente(this.inscripcion.value).subscribe( m => {
        if(m.status!=200)
          alert(m.msg.errorInfo[2]); 
        if(m.status==200) {
          location.reload();
          alert(m.msg);
        }
      });
    }
  }
}