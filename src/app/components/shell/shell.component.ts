import {
    animate,
    group,
    query,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { MediaMatcher } from '@angular/cdk/layout';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { slideAnimation } from '../../common/helpers/animations';
import { NavLink } from '../../common/models/nav-link.interface';
import { AuthService } from '../../modules/core/services/auth.service';
import { DOMEventsService } from '../../modules/core/services/dom-events.service';
import { PageTitleService } from '../../modules/core/services/page-title.service';

/**
 * The application's shell
 * @author Muhammed Sari <hi@muhammedsari.me>
 */
@Component({
    selector: 'app-shell',
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        slideAnimation(
            'translate => glossary, translate => users, glossary => users',
            'users => glossary, users => translate, glossary => translate'
        ),
    ],
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
        public pageTitleService: PageTitleService,
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
            { icon: 'list', label: 'Glossary', path: '/glossary' },
            { icon: 'account_box', label: 'Users', path: '/users' },
        ];
    }

    public signOut(): void {
        this.authService.logOut();
        this._router.navigate(['/login']);
    }
}
