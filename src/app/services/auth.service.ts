import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators/switchMap';

import { Status } from '../shared/models/status.enum';
import { User } from '../shared/models/user.interface';
/**
 * Service for handling Firebase authentication
 * @author Muhammed Sari <hi@muhammedsari.me>
 */
@Injectable()
export class AuthService {
    public user: Observable<User>;

    constructor(
        private _afAuth: AngularFireAuth,
        private _afs: AngularFirestore
    ) {
        this.user = this._afAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                    return this._afs
                        .doc<User>('users/' + user.uid)
                        .valueChanges();
                }
                return of(null);
            })
        );
    }

    /**
     * Uses Facebook as an authentication provider
     * @returns {Promise<any>} Facebook login result
     */
    public facebookLogin(): Promise<any> {
        return this.oAuthLogin(new auth.FacebookAuthProvider());
    }

    /**
     * Uses Google as an authentication provider
     * @returns {Promise<any>} Google login result
     */
    public googleLogin(): Promise<any> {
        return this.oAuthLogin(new auth.GoogleAuthProvider());
    }

    /**
     * Generic login method using OAuth
     * @param {firebase.auth.AuthProvider} provider The login method
     * @returns {Promise<any>} The result of the login process
     */
    public oAuthLogin(provider: auth.AuthProvider): Promise<any> {
        return this._afAuth.auth.signInWithPopup(provider).then(credential => {
            this.updateUserData(credential);
        });
    }

    /**
     * Wipes data from localStorage and kills the session
     */
    public logOut(): void {
        this._afAuth.auth.signOut();
    }

    /**
     * Sets the user data to Firestore
     * @param credential The user's credentials
     */
    private updateUserData(credential: any): void {
        const { displayName, email, photoURL, uid } = credential.user;
        const userRef = this._afs.doc('users/' + uid);
        const data = {
            displayName,
            email,
            lastActive: Date.now(),
            photoURL,
            status: Status.Online,
        };
        userRef.set(data);
    }
}
