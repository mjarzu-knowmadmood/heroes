import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero, HeroUpsert } from '../../../shared/models/hero.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  baseUrl = environment.apiUrl + '/heroes';

  constructor(private http: HttpClient) {}

  filterHeroesByTerm(term: string): Observable<Hero[]> {
    const url = `${this.baseUrl}?name_like=${term}`;
    return this.http.get<Hero[]>(url);
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.baseUrl);
  }

  getHeroById(id: string): Observable<Hero> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Hero>(url);
  }

  addHero(hero: HeroUpsert): Observable<Hero> {
    return this.http.post<Hero>(this.baseUrl, hero);
  }

  updateHero(hero: HeroUpsert): Observable<Hero> {
    const url = `${this.baseUrl}/${hero.id}`;
    return this.http.put<Hero>(url, hero);
  }

  deleteHero(id: string): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url);
  }
}
