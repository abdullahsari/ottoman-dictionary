import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

import { APP_READY_EVENT, REDIRECT_PATH } from '../../app.constants';
import { AuthService } from '../../services/auth.service';
import { DOMEventsService } from '../../services/dom-events.service';
import { SocialType } from '../../shared/models/social-type.enum';

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
    public listening: boolean;

    constructor(
        private _authService: AuthService,
        private _domEventsService: DOMEventsService,
        private _router: Router
    ) {}

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
        this.listening = !this.listening;
    }
}
