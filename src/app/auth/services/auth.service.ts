import { Observable, catchError, map, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl = environments.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) { }

  get currentUser(): User|undefined {
    if(!this.user) return undefined;
    return structuredClone(this.user);
    // El structureClone es la nueva solución de JS para hace "deep clone".
    // El deep clone se refiere a crear una copia completa y independiente de
    // un objeto o estructura de datos, incluyendo todos sus elementos anidados.
  }

  login(email: string, password: string):Observable<User> {

    return this.http.get<User>(`${this.baseUrl}/users/1`)
    .pipe(
      tap(user => {
        this.user = user;
      }),
      tap(user => {
        localStorage.setItem("token", "ja9857h834t.39r8nmoiwe.0r9848ir");
      })
    )
  }

  checkAuthentication(): Observable<boolean> {
    if(!localStorage.getItem("token")) return of(false);
    const token = localStorage.getItem("token");
    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        map(user => !!user),
        catchError(err => of(false)),
      )
  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }

}
