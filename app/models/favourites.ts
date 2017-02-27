import {Injectable} from "@angular/core";

import { Listing } from "../types/listing";

@Injectable()
export class FavouritesModel {
    
    private _favouritesStore: Listing[];
    
    constructor() {
        this.load();
    }

    add(listing: Listing) {
        this._favouritesStore.push(listing);
        
        this.save();
    }
    
    remove(listing: Listing) {
        const index = this._favouritesStore.findIndex(fav => fav.origin === listing.origin);
        if (index !== -1) {
            this._favouritesStore.splice(index, 1);
        }
        this.save();
    }
    
    get() {
        return this._favouritesStore;
    }
    
    isInFavourites(listing: Listing): boolean {
        return this._favouritesStore.findIndex(fav => fav.origin === listing.origin) > -1;
    }
    
    getListingByOrigin(origin: string): Listing {
        const listing = this._favouritesStore.filter(listing => listing.origin === origin);
        
        return listing.length && listing[0];
    } 
    
    private save() {
        localStorage.setItem("favourites", JSON.stringify(this._favouritesStore));
    }
    
    private load() {
        const favouritesString = localStorage.getItem("favourites");
        if(favouritesString) {
            this._favouritesStore = JSON.parse(favouritesString);
        } else {
            this._favouritesStore = [];
        }
    }

}