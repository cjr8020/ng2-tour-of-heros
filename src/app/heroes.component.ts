import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HeroService } from './hero.service';
import { Hero } from './hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private heroService: HeroService,
    private router: Router) {}

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
  // getHeroesSlowly(): void {
  //   this.heroService.getHeroesSlowly()
  //     .then(heroes => this.heroes = heroes);
  // }


  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail',this.selectedHero.id]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }

    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }

}
