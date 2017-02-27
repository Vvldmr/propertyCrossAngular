import {Injectable} from '@angular/core';
import { Jsonp, URLSearchParams, Response } from '@angular/http';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService{
    private _apiUrl: string = "http://api.nestoria.co.uk/api";
    
    constructor(private http: Jsonp){ }

    search(location: string, page: number = 1): Observable {
        let searchParams: URLSearchParams = this.getParams();
        
        searchParams.append("page", page.toString());
        searchParams.append("place_name", location);

        const res: Observable<Response> = this.http.get(this._apiUrl, { search: searchParams });

        return res
            .map( res => res.json() )
            .map( data => data.response );
    }

    searchByCoords(latitude, longitude, page: number = 1) : Observable {
        let searchParams: URLSearchParams = this.getParams();
        
        searchParams.append("page", page.toString());
        searchParams.append("centre_point", "" + latitude + "," + longitude);

        const res: Observable<Response> = this.http.get(this._apiUrl, { search: searchParams });
        
        return res
            .map( res => res.json() )
            .map( data => data.response );
    }
    
    getParams(): URLSearchParams {
        let searchParams: URLSearchParams = new URLSearchParams();
        searchParams.append("country", "uk");
        searchParams.append("pretty", "1");
        searchParams.append("action", "search_listings");
        searchParams.append("encoding", "json");
        searchParams.append("listing_type", "buy");
        searchParams.append("callback", "JSONP_CALLBACK");
        
        return searchParams;
    }
}