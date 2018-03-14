import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { REDIRECT_PATH } from '../../app.constants';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    constructor(private _authService: AuthService, private _router: Router) {}

    public logIn(): void {
        this._authService.googleLogin().then(credentials => {
            if (credentials) this._router.navigate([REDIRECT_PATH]);
        });
    }
}
