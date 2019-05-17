import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CatConfigInterface } from '../../../cat-api/search/cat-config.interface';
import { SearchService } from '../../../cat-api/search/search.service';

@Component({
    selector: 'app-random-cat-image',
    templateUrl: './random-cat-image.component.html',
    styleUrls: [ './random-cat-image.component.scss' ]
})
export class RandomCatImageComponent {

    catConfig: CatConfigInterface = { breed_id: null, size: 'thumb' };

    constructor(private searchService: SearchService) {
    }

    getRandomCatImage(catConfig: CatConfigInterface = { breed_id: 'oder sowas' }): Observable<string> {
        return this.searchService.getCatsByConfig(catConfig).pipe(map(cats => {
            return cats[ 0 ] && cats[ 0 ].url ? cats[ 0 ].url : null;
        }));
    }

    onClickedBreed(breed: string) {
        this.catConfig.breed_id = breed;
    }
}
