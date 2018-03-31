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
    private readonly PATH: string;

    constructor(
        private _authService: AuthService,
        private _afDb: AngularFireDatabase
    ) {
        this.PATH = `/glossaries/${this._authService.uid}/`;
    }

    /**
     * Adds the entries for the provided word as a glossary entry
     * @param {string} word The translated word
     * @param {string[]} entries The chosen translations
     * @returns {Promise<void>} An observable with nothing
     */
    public add(word: string, entries: string[]): Observable<void> {
        return fromPromise(this._afDb.object(this.PATH + word).set(entries));
    }

    /**
     * Removes a word as an undo action
     * @param {string} word The word to remove
     * @returns {Observable<void>} An observable with nothing
     */
    public remove(word: string): Observable<void> {
        return fromPromise(this._afDb.object(this.PATH + word).set(null));
    }
}
