import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';
// import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService {

  private heroesUrl = 'api/mockheroes';   // URI to web api

  constructor(private http: Http) { }


  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
        .toPromise()
        .then(response => response.json().data as Hero[])
        .catch(this.handleError);
  }

  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Hero)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);  // for demo purposes only
    return Promise.reject(error.message || error);
  }

  // getHeroes(): Promise<Hero[]> {
  //   return Promise.resolve(HEROES);
  // }


  // /*
  //  * simulates slow service by waiting for 2 seconds
  //  */
  // getHeroesSlowly(): Promise<Hero[]> {
  //   return new Promise<Hero[]>(resolve => setTimeout(resolve, 2000)) // delay 2 sec
  //     .then(() => this.getHeroes());
  // }


  // getHero(id: number): Promise<Hero> {
  //   return this.getHeroes()
  //     .then(heroes => heroes.find(hero => hero.id === id));
  // }

}
