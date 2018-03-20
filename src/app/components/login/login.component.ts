import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

import { APP_READY_EVENT, REDIRECT_PATH } from '../../common/constants';
import { SocialType } from '../../common/models/social-type.enum';
import { AuthService } from '../../modules/core/services/auth.service';
import { DOMEventsService } from '../../modules/core/services/dom-events.service';
import { PageTitleService } from '../../modules/core/services/page-title.service';

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
        public pageTitleService: PageTitleService,
        private _router: Router
    ) {
        this._anthem = new Audio();
        this.pageTitleService.title = 'Log in';
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
