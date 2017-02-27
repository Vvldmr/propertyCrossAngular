import { Component} from '@angular/core';

import { SearchResultsModel } from '../../../models/search-results';
import { FavouritesModel } from '../../../models/favourites';

declare var module: { id: string; };

@Component({
    moduleId: module.id,
    selector: 'fav-app',
    templateUrl: './template.html'
})
export class FavContainer {
    public list;
    constructor(
        private _favouritesModel: FavouritesModel,
        private _searchResultsModel: SearchResultsModel
    ) { }

    ngOnInit() {
        this._searchResultsModel.set({ name: "", key: "" }, this._favouritesModel.get(), 0);
        this._searchResultsModel.results$.subscribe(results => {
            this.list = [];

            results.listings.forEach(listing => this.list.push(listing));
        });
        this._searchResultsModel.get();
    }
}