import { Listing } from "./listing";
import { SLocation } from "./location";

export interface SearchResults {
    location: SLocation;
    listings: Array<Listing>;
    totalResults: number;
    currentPage: number;
}