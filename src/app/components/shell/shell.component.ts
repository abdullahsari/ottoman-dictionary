import { MediaMatcher } from '@angular/cdk/layout';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { DOMEventsService } from '../../services/dom-events.service';
import { NavLink } from '../../shared/models/nav-link.interface';

@Component({
    selector: 'app-shell',
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements AfterViewInit, OnDestroy, OnInit {
    private _mobileQueryListener: () => void;
    public mobileQuery: MediaQueryList;
    public navLinks: NavLink[];

    constructor(
        public authService: AuthService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _domEventsService: DOMEventsService,
        private _mediaMatcher: MediaMatcher,
        private _router: Router
    ) {}

    public ngAfterViewInit(): void {
        this._domEventsService.triggerOnDocument('appready');
    }

    public ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    public ngOnInit(): void {
        this.mobileQuery = this._mediaMatcher.matchMedia('(min-width: 961px)');
        this._mobileQueryListener = () =>
            this._changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
        this.navLinks = [
            { icon: 'translate', label: 'Translate', path: '/translate' },
        ];
    }

    public signOut(): void {
        this.authService.logOut();
        this._router.navigate(['/login']);
    }
}
