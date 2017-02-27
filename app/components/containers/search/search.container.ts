import { Component} from '@angular/core';
import { SearchService} from '../../../services/search-service';

import {Observable} from "rxjs/Observable";
import { Listing } from "../../../types/listing";
import { SLocation } from "../../../types/location";

import { SearchResultsModel } from '../../../models/search-results';

declare var module: { id: string; };

@Component({
    moduleId: module.id,
    selector: 'search-app',
    templateUrl: 'template.html',
    providers: [ SearchService ]
})
export class SearchContainer {
    public searchResults: Array<Listing> = [];
    private searchLocation: SLocation;
    public totalResults: number;
    private currentPage: number;
    public isLoadingMore: boolean;

    constructor(
        private _searchResultsModel: SearchResultsModel,
        private SearchService: SearchService
    ) { }

    ngOnInit() {
        this._searchResultsModel.results$.subscribe(results => {
            this.searchResults = [];

            results.listings.forEach(listing => this.searchResults.push(listing));
            this.searchLocation = results.location;
            this.totalResults = results.totalResults;
            this.currentPage = results.currentPage;
            this.isLoadingMore = false;
        });
        this._searchResultsModel.get();
    }

    loadMore() {
        if(this.isLoadingMore || this.searchResults.length === this.totalResults) {
            return;
        }
        this.isLoadingMore = true;
        let response = <Observable<any>> this.SearchService.search(this.searchLocation.key, this.currentPage + 1);
        response.subscribe(res => {
                if(res.application_response_code === "100" || res.application_response_code === "101" || res.application_response_code === "110") {
                    if (res.listings.length > 0) {
                        this._searchResultsModel.add(res.listings.map(listing => { return {
                            guid: listing.guid,
                            title: listing.title,
                            bathroom_number: listing.bathroom_number,
                            bedroom_number: listing.bedroom_number,
                            img_url: listing.img_url,
                            price: listing.price,
                            price_currency: listing.price_currency,
                            summary: listing.summary
                        }}));
                    }
                }
            },
            err => {
                console.error("An error occured: " + err);
            });

    }

    loadingButtonEnabled(): boolean {
        return !this.isLoadingMore && this.searchResults.length < this.totalResults;
    }
}