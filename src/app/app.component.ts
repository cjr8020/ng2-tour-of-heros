// import { Ng2TourOfHerosPage } from '../../e2e/app.po';
import { Component, OnInit } from '@angular/core';
import { HeroService } from './hero.service';
import { Hero } from './hero';


@Component({
  selector: 'app-root',
  providers: [HeroService],
  template: `

    <h1>{{title}}</h1>
    <div class="header-bar"></div>
    
    <h2>My Heroes</h2>
    <ul class="heroes">
        <!-- each hero goes here -->
      <li *ngFor="let hero of heroes"
          [class.selected]="hero === selectedHero" 
          (click)="onSelect(hero)">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>

    <app-hero-detail [hero]="selectedHero"></app-hero-detail>

  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title:string = 'Tour of Heroes';
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
    // this.getHeroesSlowly();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes);
  }

  /*
   * simulates slow service 
   */
  getHeroesSlowly(): void {
    this.heroService.getHeroesSlowly()
      .then(heroes => this.heroes = heroes);
  }




  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }



}
