import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { User } from '../../../common/models/user.interface';

@Injectable()
export class UsersService {
    constructor(private _afDb: AngularFireDatabase) {}

    public fetchAll(): Observable<User[]> {
        return this._afDb.list<User>('/users').valueChanges();
    }
}
