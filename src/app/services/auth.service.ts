import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

import { User, auth } from 'firebase/app';
/**
 * Service for handling Firebase authentication
 * @author Muhammed Sari <hi@muhammedsari.me>
 */
@Injectable()
export class AuthService {
    public user: Observable<User>;

    constructor(private _afAuth: AngularFireAuth, private _router: Router) {
        this.user = this._afAuth.authState;
    }

    public googleLogin(): Promise<any> {
        return this._afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }

    public logOut(): void {
        this._afAuth.auth.signOut();
    }
}
