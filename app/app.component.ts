import { Component } from '@angular/core';

import { FavouritesModel } from './models/favourites';

@Component({
    selector: 'app',
    template: `<div>
                    <header>
                        <a routerLink="/favourites" class="btn btn-default fl_r" >
                            <span class="glyphicon glyphicon-star"></span> Faves <span id="faves_count">{{ FavouritesModel.get().length }}</span>
                        </a>
                        <h2>
                            <a routerLink="">PropertyCross</a>
                        </h2>
                    </header>
                    <router-outlet></router-outlet>
               </div>`
})
export class AppComponent {
    constructor(public FavouritesModel: FavouritesModel){}
}