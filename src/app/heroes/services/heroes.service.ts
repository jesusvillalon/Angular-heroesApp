import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {
  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  // Obtenemos a todos los héroes (mediante un array)
  getHeroes(): Observable<Hero[]> {

    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  // Obtenemos la información de un sole héroe en particular
  getHeroById(id: string): Observable<Hero | undefined>{
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        catchError(error => of(undefined))
      )
  }

  // Obtenemos una sugerencia de búsqueda
  getSuggestion(query: string): Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`);
  }

  // Añadimos un nuevo héroe a la base de datos
  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero);
  }

  // Actualizamos la información de un héroe en concreto
  updateHero(hero: Hero): Observable<Hero>{
    if(!hero.id) throw Error('Hero id id required');
    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
  }

  // Eliminamos un héroe de la base de datos
  deleteHeroById(id: string): Observable<boolean>{
    return this.http.delete(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        // Si nos da error al eliminar un héroe ya eliminado que obtenga dicho error
        map(resp => true),
        catchError(err => of(false)),
      );
  }


}
