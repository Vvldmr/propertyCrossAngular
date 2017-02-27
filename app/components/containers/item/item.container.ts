import { Component} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';

import { Listing } from "../../../types/listing";
import { SearchResultsModel } from '../../../models/search-results';

import { FavouritesModel } from '../../../models/favourites';

declare var module: { id: string; };

@Component({
    moduleId: module.id,
    selector: 'item-app',
    templateUrl: './template.html'
})
export class ItemContainer {
    model: Listing;

    constructor(
        private _searchResultsModel: SearchResultsModel,
        private activateRoute: ActivatedRoute,
        private _router: Router,
        private _location: Location,
        public _favouritesModel: FavouritesModel
    ) {}

    ngOnInit() {
        this._searchResultsModel.results$.subscribe(results => {
            let start = this.activateRoute.snapshot.params['guid'];

            if(!start || !results.listings.length){
                this._router.navigate([""]);
                return;
            }
            this.model = results.listings.slice(start - 1, start)[0];
        });
        this._searchResultsModel.get();
    }

    toggleFave(){
        if(!this._favouritesModel.isInFavourites(this.model)){
            this._favouritesModel.add(this.model);
        }else{
            this._favouritesModel.remove(this.model);
        }
    }

    back(){
        this._location.back();
    }
}