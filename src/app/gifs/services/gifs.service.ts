import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private     apiKey     : string = 'R1zev5evWqjVpoyhEQlFWdFgaAK3K0yH';
  private     servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial     : string[] = [];

  public resultados: Gif[] = [];
  
  get historial() {
    return [...this._historial];
  }

  constructor( private http: HttpClient ){
    this._historial = JSON.parse(localStorage.getItem('historial')!) || []

    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []

  }


  buscarGifs( query: string = '') {

    query = query.trim().toLocaleLowerCase();
    
    // esta funcion valida que en el historial no hayan busquedas repetidas
    if( !this._historial.includes( query )){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial)  );
    }

    const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit', '30')
        .set('q', query);

        console.log(params.toString)


    this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, { params })
    .subscribe( ( response ) => {
      this.resultados = response.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados)  );

    });

  }


}
