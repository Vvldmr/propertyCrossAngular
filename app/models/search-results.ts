import {Injectable} from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/share';
import { Listing } from "../types/listing";
import { SLocation } from "../types/location";
import { SearchResults } from "../types/search-results";

@Injectable()
export class SearchResultsModel {

    results$: Observable<SearchResults>;

    private _resultsObserver: any;
    private _resultsStore: {
        results: SearchResults;
    };

    constructor() {
        this.results$ = new Observable<SearchResults>(observer => { this._resultsObserver = observer; } ).share();
        
        this.results$.subscribe();
        this._resultsStore = {
            results: {
                location: null,
                listings: [],
                totalResults: 0,
                currentPage: 0
            }
        };
    }

    set(location: SLocation, listings: Listing[], totalResults: number) {
        this._resultsStore.results = {
            location,
            listings,
            totalResults,
            currentPage: 1
        };
        this._resultsObserver.next(this._resultsStore.results);
    }

    add(listings: Listing[]) {
        this._resultsStore.results.listings = this._resultsStore.results.listings.concat(listings);
        this._resultsStore.results.currentPage++;
        this._resultsObserver.next(this._resultsStore.results);
    }

    get() {
        this._resultsObserver.next(this._resultsStore.results);
    }
}