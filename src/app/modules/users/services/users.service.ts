import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { User } from '../../../common/models/user.interface';

/**
 * Service for retrieving user related data
 * @author Muhammed Sari <hi@muhammedsari.me>
 */
@Injectable()
export class UsersService {
    constructor(private _afDb: AngularFireDatabase) {}

    /**
     * Retrieves all of the users from Firebase
     * @returns {Observable<User[]>} An observable with all of the users
     */
    public fetchAll(): Observable<User[]> {
        return this._afDb.list<User>('/users').valueChanges();
    }
}
