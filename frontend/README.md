# Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.23 with
```
ng new frontend
cd frontend
npm install jqwidgets-ng
ng serve

```
```
ng generate component datagrid
ng generate service http
```
Added to app.module.ts
```
import { CommonModule } from '@angular/common'
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { jqxButtonModule } from 'jqwidgets-ng/jqxbuttons';
import { HttpClientModule }    from '@angular/common/http';

  imports: [
    BrowserModule,
    AppRoutingModule,

    CommonModule, 
    jqxGridModule, 
    jqxButtonModule,
    HttpClientModule,
  ],

```



## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
