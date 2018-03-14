import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    private readonly REDIRECT_PATH: string = '/translate';

    constructor(private _authService: AuthService, private _router: Router) {}

    public logIn(): void {
        this._authService.googleLogin().then(credentials => {
            if (credentials) this._router.navigate([this.REDIRECT_PATH]);
        });
    }
}
