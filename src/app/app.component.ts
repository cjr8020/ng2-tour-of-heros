import { Ng2TourOfHerosPage } from '../../e2e/app.po';
import { Component } from '@angular/core';
import { Hero } from './hero';

@Component({
  selector: 'app-root',
  template: `

    <h1>{{title}}</h1>
    <div class="header-bar"></div>
    <h2>{{hero.name}} details!</h2>
    <div>
      <label>id: </label>{{hero.id}}
    </div>
    <div>
      <label>name: </label>
      <input [(ngModel)]="hero.name" placeholder="name">
    </div>

  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title:string = 'Tour of Heroes';
  hero: Hero = {
    id: 1,
    name: 'windstorm'
  };
}
