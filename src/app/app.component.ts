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

    <app-heroes></app-heroes>

  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title:string = 'Tour of Heroes';

}
