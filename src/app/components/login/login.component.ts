import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

import { APP_READY_EVENT, REDIRECT_PATH } from '../../app.constants';
import { AuthService } from '../../services/auth.service';
import { SocialType } from '../../shared/models/social-type.enum';
import { DOMEventsService } from '../../shared/services/dom-events.service';

/**
 * The login screen
 * @author Muhammed Sari <hi@muhammedsari.me>
 */
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit {
    private _anthem: HTMLAudioElement;
    public listening: boolean;

    constructor(
        private _authService: AuthService,
        private _domEventsService: DOMEventsService,
        private _router: Router
    ) {
        this._anthem = new Audio();
    }

    public ngAfterViewInit(): void {
        this._domEventsService.triggerOnDocument(APP_READY_EVENT);
    }

    /**
     * Displays a popup to let the user log in using Google
     */
    public signIn(type: string): void {
        let login;
        switch (type) {
            case SocialType.Facebook:
                login = this._authService.facebookLogin();
                break;
            case SocialType.Google:
                login = this._authService.googleLogin();
        }
        login.then(() => {
            this._router.navigate([REDIRECT_PATH]);
        });
    }

    /**
     * Either plays the Ottoman anthem or mutes it
     */
    public toggleAnthem(): void {
        if (this.listening) {
            this._anthem.pause();
        } else {
            this._anthem.src = '../../assets/audio/anthem.mp3';
            this._anthem.load();
            this._anthem.currentTime = 0;
            this._anthem.play();
        }
        this.listening = !this.listening;
    }
}
