import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { AuthService } from '../../core/services/auth.service';

/**
 * Service for handling translations
 * @author Muhammed Sari <hi@muhammedsari.me>
 */
@Injectable()
export class TranslateService {
    constructor(
        private _authService: AuthService,
        private _afDb: AngularFireDatabase
    ) {}

    /**
     * Adds the entries for the provided word as a glossary entry
     * @param {string} word The translated word
     * @param {string[]} entries The chosen translations
     * @returns {Promise<void>} An empty promise just for knowing the write result
     */
    public add(word: string, entries: string[]): Promise<void> {
        return this._afDb
            .object(`/glossaries/${this._authService.uid}/${word}`)
            .set(entries);
    }
}
