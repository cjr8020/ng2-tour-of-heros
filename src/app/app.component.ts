import { HeroesComponent } from './heroes.component';
// import { Ng2TourOfHerosPage } from '../../e2e/app.po';
import { Component, ComponentRef, OnInit } from '@angular/core';
import { HeroService } from './hero.service';
import { Hero } from './hero';


@Component({
  selector: 'app-root',
  providers: [HeroService],
  template: `

    <h1>{{title}}</h1>
    <div class="header-bar"></div>

    <!-- 
      now, instead of dispayng the HeroesComponent right away, 
      we display a router link hooked up to that Component
    --> 
    <!--<app-heroes></app-heroes>-->

    <nav>
      <a routerLink="/dashboard">Dashboard</a>
      <a routerLink="/heroes">Heroes</a>
    </nav>
    <router-outlet></router-outlet>

  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title:string = 'Tour of Heroes';

}
