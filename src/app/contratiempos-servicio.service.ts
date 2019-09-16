import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { ICliente } from './model/interfaces/icliente';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class ContratiemposServicioService {

  private url:string = 'http://maldonadoricardo.000webhostapp.com/contratiempos/v1/api/cliente';
  Clientes:ICliente[];

  constructor( private http: HttpClient) {}

  clientesRegistrados(){
      return this.http.get(this.url).pipe(
        map( (res) => {
          return this.Clientes = <ICliente[]>res['datos'];
        }),
        
        catchError( this.handleError)
      );
   }

   private handleError( error : HttpErrorResponse){
      return throwError(console.log(error));
   }

   registrarCliente(cliente:ICliente):Observable<any>{
    
    return this.http.post(this.url,JSON.stringify(cliente), {
        headers : new HttpHeaders({      
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        })
    }).pipe(catchError(this.handleError));
    
  }

  eliminarCliente(id:number):Observable<any>{
    return this.http.post<void>(`${this.url}/${id}`,{
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json'
      })
    }).pipe(catchError(this.handleError));
  }

  modificarCliente( cliente ):Observable<any>{
    return this.http.put(this.url,JSON.stringify(cliente),{
      headers : new HttpHeaders({      
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    })
      }).pipe(catchError(this.handleError));
  }
}
