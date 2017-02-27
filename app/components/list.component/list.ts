import { Component, Input} from '@angular/core';

import { Listing } from "../../types/listing";

@Component({
    selector: 'list-item',
    template: `<div class="col-xs-6 col-md-4 house-item">
        <div class="row">
            <div class="col-xs-12 house-item--title">
                <a routerLink="/details/{{ guid + 1 }}">
                    {{ item.title }}
                </a>
            </div>
    
            <div class="col-xs-12 house-item--image">
                <div [ngStyle]="{'background-image': 'url(' + item.img_url + ')'}" ></div>
            </div>
    
            <div class="col-xs-12 house-item--summary">
                <div class="row">
                    <div class="col-xs-9 house-item--text">
                        {{ item.summary }}
                    </div>
                    <div class="col-xs-3 house-item--price">
                        {{ item.price }}
                    </div>
                </div>
            </div>
        </div>
    </div>`
})
export class ListComponent {
    @Input() item: Listing;
    @Input() guid: Number;
}