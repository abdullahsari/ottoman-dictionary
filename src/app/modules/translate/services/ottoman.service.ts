import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

import { Translation } from '../../../shared/models/translation.interface';

/**
 * This service is responsible for anything related to
 * the translation of Ottoman Turkish.
 * @author Muhammed Sari <hi@muhammedsari.me>
 */
@Injectable()
export class OttomanService {
    private readonly LUGGAT_URL: string = 'http://www.luggat.com';
    private readonly REVERSE_PROXY: string = 'https://cors-anywhere.herokuapp.com/';

    constructor(private _httpClient: HttpClient) {}

    /**
     * Translate the provided word using the translation service.
     * @param {string} word The word that should be translated
     * @returns {Observable<any>} An observable with the translation
     */
    public translate(word: string): Observable<Translation> {
        // Reverse proxy server is needed to bypass Access-Control-Allow-Origin
        return this._httpClient
            .post(this.REVERSE_PROXY + this.LUGGAT_URL, null, {
                responseType: 'text',
                params: {
                    Bul: 'OSMANLICA ARA',
                    search: word,
                },
            })
            .pipe(
                map(raw => {
                    // Parse the whole page as an HTML document
                    const page = new DOMParser().parseFromString(
                        raw,
                        'text/html'
                    );

                    // Retrieve the element in which the translations reside
                    const el = page.body.querySelector(
                        '#ceviri .col-md-6 .row'
                    );

                    // Retrieve the word that was searched
                    const searched = el
                        .getElementsByTagName('h2')[0]
                        .textContent.split(' / ')[0];

                    // Find all of the results for the search term
                    const results = Array.from(
                        el.getElementsByTagName('ul')
                    ).map(entry => entry.textContent);

                    // Return Translation
                    return { searched, results };
                })
            );
    }
}
