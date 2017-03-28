import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() public hero: Hero;
  
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  /*
  Here we use the 'params' observable to extract the 'id' param value
  from the ActiveRoute service and use the HeroService to fetch the Hero
  with that 'id'.

  switchMap operator maps the id in the observable route parameters to a new
  Observable, the result of the HeroService.getHero Method.

  If the user re-navigates to this component while a getHero request is still
  inflight, switchMap cancels the old request before calling getHero again.

  The hero id is a number.  Route parameters are always strings.  So we convert
  the route parameter value to a number with the JavaScript(+) operator.
   */
  ngOnInit(): void {
    this.route.params
      .switchMap( (params: Params) => this.heroService.getHero(+params['id']))
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.update(this.hero)
      .then( () => this.goBack() );
  }

}
