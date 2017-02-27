import {Injectable} from "@angular/core";
import { RecentSearchItem } from "../types/recent-search-item";

@Injectable()
export class Recent {
    private recentSearches: RecentSearchItem[];

    constructor() {
        this.getRecentSearches();
    }

    addRecentSearch(recentSearch: RecentSearchItem) {
        this.recentSearches = this.recentSearches.filter(loc => loc.location.key != recentSearch.location.key );
        this.recentSearches.unshift(recentSearch);
        if(this.recentSearches.length > 5) {
            this.recentSearches.pop();
        }
        this.save();
    }

    getRecentSearches(): RecentSearchItem[] {
        const recentSearchString = localStorage.getItem('RecentSearchItem');
        if(recentSearchString) {
            this.recentSearches = <Array<RecentSearchItem>>JSON.parse(recentSearchString);
        } else {
            this.recentSearches = [];
        }
        return this.recentSearches;
    }

    private save() {
        localStorage.setItem("RecentSearchItem", JSON.stringify(this.recentSearches));
    }
}