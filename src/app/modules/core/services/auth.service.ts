import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { auth, database } from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { of } from 'rxjs/observable/of';
import { timer } from 'rxjs/observable/timer';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { switchMap } from 'rxjs/operators/switchMap';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { throttleTime } from 'rxjs/operators/throttleTime';

import { Status } from '../../../common/models/status.enum';
import { User } from '../../../common/models/user.interface';

/**
 * Service for handling Firebase authentication
 * @author Muhammed Sari <hi@muhammedsari.me>
 */
@Injectable()
export class AuthService {
    private _timer: Subscription;
    private _uid: string;
    private _unsubcribe$: Subject<void>;
    public user$: Observable<User>;

    constructor(
        private _afAuth: AngularFireAuth,
        private _afDb: AngularFireDatabase,
        @Inject(DOCUMENT) private _document: Document
    ) {
        this._unsubcribe$ = new Subject<void>();
        this.user$ = this._afAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                    this._uid = user.uid;
                    this.updateOnConnect();
                    this.updateOnDisconnect();
                    this.updateOnIdle();
                    return this._afDb
                        .object('/users/' + user.uid)
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
        return this._afAuth.auth
            .signInWithPopup(provider)
            .then(credential => this.updateUserData(credential));
    }

    /**
     * Wipes data from localStorage and kills the session
     */
    public logOut(): void {
        this.updateStatus(Status.Offline);
        this._unsubcribe$.next();
        this._afAuth.auth.signOut();
    }

    private resetIdleTimer(): void {
        if (this._timer && !this._timer.closed) this._timer.unsubscribe();
        this._timer = timer(30000)
            .pipe(takeUntil(this._unsubcribe$))
            .subscribe(() => {
                this.updateStatus(Status.Idle);
            });
    }

    /**
     * Updates the user's status when a connection to Firebase starts
     */
    private updateOnConnect(): void {
        this._afDb
            .object('.info/connected')
            .valueChanges()
            .pipe(takeUntil(this._unsubcribe$))
            .subscribe(connected => {
                this.updateStatus(connected ? Status.Online : Status.Offline);
            });
    }

    /**
     * Updates the 's status when the connection to Firebase ends
     */
    private updateOnDisconnect(): void {
        database()
            .ref()
            .child('users/' + this._uid)
            .onDisconnect()
            .update({ lastActive: Date.now(), status: Status.Offline });
    }

    /**
     * Determines if the user is in an idle state
     */
    private updateOnIdle(): void {
        fromEvent(this._document, 'mousemove')
            .pipe(takeUntil(this._unsubcribe$), throttleTime(2000))
            .subscribe(() => {
                this.updateStatus(Status.Online);
                this.resetIdleTimer();
            });
        fromEvent(this._document, 'visibilitychange')
            .pipe(takeUntil(this._unsubcribe$), debounceTime(5000))
            .subscribe(() => {
                if (this._document.visibilityState === 'hidden') {
                    this.updateStatus(Status.Idle);
                }
            });
    }

    /**
     * Updates a user's status in the Firebase DB
     * @param {Status} status The new status
     */
    private updateStatus(status: Status): void {
        if (!this._uid) return;
        const update: any = { status };
        if (status === Status.Offline) update.lastActive = Date.now();
        this._afDb.object('users/' + this._uid).update(update);
    }

    /**
     * Sets the user data to Firestore
     * @param credential The user's credentials
     */
    private updateUserData(credential: any): Promise<void> {
        const { displayName, email, photoURL, uid } = credential.user;
        const userRef = this._afDb.object('/users/' + uid);
        const data = {
            displayName,
            email,
            lastActive: Date.now(),
            photoURL,
            provider: credential.additionalUserInfo.providerId.split('.')[0],
            status: Status.Online,
        };
        return userRef.set(data);
    }
}
