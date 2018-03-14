import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { REDIRECT_PATH } from '../../app.constants';
import { AuthService } from '../../services/auth.service';

/**
 * The login screen
 * @author Muhammed Sari <hi@muhammedsari.me>
 */
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    constructor(private _authService: AuthService, private _router: Router) {}

    /**
     * Displays a popup to let the user log in using Google
     */
    public logIn(): void {
        this._authService.googleLogin().then(credentials => {
            if (credentials) this._router.navigate([REDIRECT_PATH]);
        });
    }
}
