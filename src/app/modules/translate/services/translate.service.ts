import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { AuthService } from '../../core/services/auth.service';

/**
 * Service for handling translations
 * @author Muhammed Sari <hi@muhammedsari.me>
 */
@Injectable()
export class TranslateService {
    private readonly BASE_PATH: string;

    constructor(
        private _authService: AuthService,
        private _afDb: AngularFireDatabase
    ) {
        this.BASE_PATH = `/glossaries/${this._authService.uid}/meanings/`;
    }

    /**
     * Adds the meanings for the provided word
     * @param {string} word The translated word
     * @param {string[]} meanings The chosen translations
     * @returns {Promise<void>} An observable with nothing
     */
    public add(word: string, meanings: string[]): Observable<void> {
        return fromPromise(
            this._afDb.object(`${this.BASE_PATH}/${word}`).set(meanings)
        );
    }

    /**
     * Removes a word as an undo action
     * @param {string} word The word to remove
     * @returns {Observable<void>} An observable with nothing
     */
    public remove(word: string): Observable<void> {
        return fromPromise(
            this._afDb.object(`${this.BASE_PATH}/${word}`).set(null)
        );
    }
}
