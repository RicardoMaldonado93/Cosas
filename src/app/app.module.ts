import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ListaComponent } from './feacture/clientes/lista/lista.component';
import { ItemComponent } from './feacture/clientes/item/item.component';
import { HttpClientModule } from '@angular/common/http';
import { ContratiemposServicioService } from './contratiempos-servicio.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    ListaComponent,
    ItemComponent,

  ],
  imports: [
    BrowserModule, HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule

  ],
  providers: [ContratiemposServicioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
