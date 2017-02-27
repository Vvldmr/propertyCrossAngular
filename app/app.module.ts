import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import {Routes, RouterModule} from '@angular/router';
import { JsonpModule } from '@angular/http';

import { AppComponent }   from './app.component';

import { ItemContainer }   from './components/containers/item/item.container';
import { SearchContainer }   from './components/containers/search/search.container';
import { HomeContainer }   from './components/containers/home/home.container';
import { FavContainer }   from './components/containers/fav/fav.container';

import { ListComponent }   from './components/list.component/list';

import { SearchResultsModel }   from './models/search-results';
import { FavouritesModel }   from './models/favourites';
import { Recent }   from './models/recent';


const appRoutes: Routes =[
    { path: '', component: HomeContainer },
    { path: 'details/:guid', component: ItemContainer},
    { path: 'search', component: SearchContainer},
    { path: 'favourites', component: FavContainer},
    { path: '**', redirectTo: '/' }
];


const imports = [
    BrowserModule,
    FormsModule,
    JsonpModule,
    RouterModule.forRoot(appRoutes)
];
const declarations = [
    AppComponent,
    ItemContainer,
    SearchContainer,
    HomeContainer,
    FavContainer,
    ListComponent
];
const bootstrap = [
    AppComponent
];


@NgModule({
    imports,
    declarations,
    bootstrap,
    providers: [ SearchResultsModel, FavouritesModel, Recent ]
})
export class AppModule { }