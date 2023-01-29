import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;
  // El ! es para dar a conocer el Non-null assertion operator

  constructor( private GifsService: GifsService ) {}

  buscar() {
    const valor = this.txtBuscar.nativeElement.value;

    // con esta validación evitamos guardar vacios
    if ( valor.trim().length === 0) {
      return;
    }
  
    this.GifsService.buscarGifs( valor );

    this.txtBuscar.nativeElement.value = '';
  }

}
