import { SecureContext, SecurePair } from 'tls';
import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService {

  constructor() { }

  getHeroes(): Promise<Hero[]> {
    return Promise.resolve(HEROES);
  } 

  /*
   * simulates slow service by waiting for 2 seconds
   */
  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise<Hero[]>( resolve => setTimeout(resolve, 2000)) // delay 2 sec
      .then( () => this.getHeroes() );
  }

}
