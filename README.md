# Ng2TourOfHeros

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.21.

#### create Hero class

```
$ ng g cl hero
installing class
  create src/app/hero.ts
```

#### Hero service

removed `HeroService` from the `providers` array of `HeroesComponent`, and
added it to the `providers` array of `AppModule`.

That move created a singleton `HeroService` instance, available to `all`
components of the application.

Angular will inject `HeroService`  and it will be avaible for `DashboardComponent`
as well.


#### Tour of Heroes navigation

![nav diag](./src/assets/nav-diagram.png)

Here is the plan:

* turn `AppComponent` into an application shell that only handles navigation

  our current app loads `AppComponent` and immediately displays the list of heroes.
  the revised app should present a shell with a choice of views 
  (Dashboard and Heroes) and then default to one of them.
  

* Relocate the `Heroes` concerns within the current `AppComponent` to a separate
  `HeroesComponent`
* Add routing
* Create a new `DashBoardComponent`
* Tie the `Dashboard` into the nav structure  


##### routing

We want the app to show the dashboard when it starts and we want to see 
a nice URL in the browser address bar that says `/dashboard`.
We can use a `redirect` route to make this happen:

```
    RouterModule.forRoot([
      {
        path: 'heroes',
        component:HeroesComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      }
    ])
```

#### navigate to hero detail

1. from the `Dashboard` to a selected hero
2. from the `Heroes` list to a selected hero
3. from a "deep link" URL pasted into the browser address bar

Step 1 - added a hero-detail route...

```
      {
        path: 'detail/:id',
        component: HeroDetailComponent
      }
```

`HeroDetailComponent` no longer receives `hero` from its parent component.
It should take the `id` param from the `params` observable in the 
`ActivateRoute` service and use the `HeroService` to fetch the hero with
that id.

#### refactored routing

app-routing.module.ts

```
import { NgModule }               from '@angular/core';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes.component';
import { DashboardComponent } from './dashboard.component';
import { HeroDetailComponent } from './hero-detail.component';

const routes: Routes = [
  { path: 'heroes', component:HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: HeroDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
```

app.module.ts

```
.
.
.
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroesComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [HeroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
```


#### HTTP services and mocking web API

use in-memory web API to mock a service



#### search-by-name feature

as the user types a name into a search box, make repeated http requests
filtered by that name.

```
$ ng g s hero-search --flat
installing service
  create src/app/hero-search.service.spec.ts
  create src/app/hero-search.service.ts
  WARNING Service is generated but not provided, it must be provided to be used
```


## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


###   Configuring TS Version for VS Code 

VS Code ships with a recent stable version of TypeScript.
It also performs version checking for any version of TypeScript you may have
installed globally or locally in your workspace.

```
  $ npm list typescript // locally 

  $ npm list typescript -g // globally
```

By default, VS Code will warn if your global version is different than VS Code's
TS version since this may cause inconsistent compiler errors when building
your project within VS Code and in an external terminal.

You can also direct VS Code to use your workspace TypeScript version with the
'typescript.tsdk' setting pointing to a directory containing the TS 
'tsserver.js' file.

e.g. to instruct VS Code to use the TS version in your workspace node_modules:

  workspace settings.json:

```
    {
      "typescript.tsdk": "./node_modules/typescript/lib"
    }
```

After setting typescript.tsdk, restart VS Code and the TypeScript version
will be shown in the bottom right of the Status Bar when you open a JavaScript
or TypeScript file.


## Deploying to Apache

Suppose, you're about to deploy this app to an apache 2.2 instance to an 
Alias'ed path:

```
Alias /ng/ "/apps/angular-apps/"
<Directory /apps/angular-apps>
  Order allow,deny
  Allow from all
  AllowOverride All
</Directory>
```
Angular2 Router supports two techniques for managing browser's location and history:

1. PathLocationStrategy - the default "HTML 5 pushState" style
2. HashLocationStrategy - the "hash URL" style (for real old browsers)

To make `PathLocationStrategy` work on Apache, you will need to create an
`.htaccess` file in the same location as your index.HTML

Taking into consideration the above httpd.conf snippet, here's the `.htaccess` 
file content:

```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /ng/tour-of-heroes/
  RewriteRule ^index\.html$ - [L]

  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d

  # do not rewrite css, js and images
  RewriteCond %{REQUEST_URI} !\.(?:css|js|map|jpe?g|gif|png)$ [NC]

  RewriteRule . /ng/tour-of-heroes/index.html [L]
</IfModule>
```

Finally, generate the `prod` distribution for this application to be deployed
on the apache server using the following command:

```
$ ng build --prod --base-href /ng/tour-of-heroes/
```
This will ensure that the generated `index.html` file has `base href` that 
matches our target server configuration:

```
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Ng2TourOfHeros</title>
  <base href="/ng/tour-of-heroes/">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
<link href="styles.622c1e2152786c612d9feac19a219d0e.bundle.css" rel="stylesheet"></head>
<body>
  <app-root>Loading...</app-root>
<script type="text/javascript" src="inline.d41d8cd98f00b204e980.bundle.js"></script><script type="text/javascript" src="styles.b2328beb0372c051d06d.bundle.js"></script><script type="text/javascript" src="main.19929f08046e175b7224.bundle.js"></script></body>
</html>
```



