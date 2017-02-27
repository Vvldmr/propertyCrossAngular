import { Component} from '@angular/core';

import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";
import { SearchService } from '../../../services/search-service';

import { SearchResultsModel } from '../../../models/search-results';
import { Recent } from '../../../models/recent';

import { SLocation } from '../../../types/location';
import { RecentSearchItem } from '../../../types/recent-search-item';

declare var module: { id: string; };

@Component({
    moduleId: module.id,
    selector: 'home-app',
    templateUrl: 'template.html',
    providers: [ SearchService ]
})
export class HomeContainer {
    public errorMessage: string;
    public location: SLocation = {
        key: "",
        name: ""
    };
    public searchType: string = "name";

    public recentLocations: RecentSearchItem[];
    public proposedLocations: SLocation[];

    constructor(
        private SearchService: SearchService, 
        private _router: Router, 
        private _searchResultsModel: SearchResultsModel, 
        private _recents: Recent
    ){ 
        this.recentLocations = this._recents.getRecentSearches();
    }

    changeSearchType(type){
        this.searchType = type || 'name';
    }
    searchSubscribe(obsorver: Observable <any>){
        obsorver.subscribe(res => {
            if(res.application_response_code.substr(0, 1) === "1") {
                if (res.listings.length > 0) {
                    const location = {
                        key: res.locations[0].place_name,
                        name: res.locations[0].long_title
                    };
                    this.addRecentLocation({location, results: res.total_results});
                    this._searchResultsModel.set(location, res.listings.map(listing => { return {
                        origin: listing.lister_url,
                        title: listing.title,
                        bathroom_number: listing.bathroom_number,
                        bedroom_number: listing.bedroom_number,
                        img_url: listing.img_url,
                        price: listing.price,
                        price_currency: listing.price_currency,
                        summary: listing.summary
                    }}), res.total_results);

                    this._router.navigate(["search"]);
                } else {
                    this.errorMessage = "There were no properties found for the given location.";
                }
            } else if((res.application_response_code === "200" || res.application_response_code === "202") && res.locations.length) {
                res.locations.forEach(propLocation => this.proposedLocations.push({ key: propLocation.place_name, name: propLocation.long_title }));
            } else {
                this.errorMessage = "There has been a problem with your search.";
            }

            this.resetLocation();
        }, () => {
            this.errorMessage = "There has been a problem with your search.";
        });
    }
    search(searchLoc){
        if(this.searchType === 'name'){
            searchLoc = searchLoc || this.location.name;
            if(!searchLoc) return;
            this.searchSubscribe(this.SearchService.search(searchLoc, 1));
        }else{
            const loc = this.location.name.split(",");
            this.searchSubscribe(this.SearchService.searchByCoords(loc[0].trim(), loc[1].trim(), 1));
        }
    }

    resetLocation(){
        this.location.key = "";
        this.location.name = "";
    }

    goFromRecent(index){
        const a = this._recents.getRecentSearches();
        if(!a.length) return;

        const item = a.slice(index, index + 1)[0];

        this.search(item.location.name);
    }
    
    addRecentLocation(location){
        this._recents.addRecentSearch(location);
    }
}