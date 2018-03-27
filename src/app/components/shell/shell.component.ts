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
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { NavLink } from '../../common/models/nav-link.interface';
import { AuthService } from '../../modules/core/services/auth.service';
import { DOMEventsService } from '../../modules/core/services/dom-events.service';
import { PageTitleService } from '../../modules/core/services/page-title.service';

@Component({
    selector: 'app-shell',
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.scss'],
    animations: [
        trigger('slideAnimation', [
            transition('translate => users', [
                style({ height: '!' }),
                query(':enter', style({ transform: 'translateX(100%)' })),
                query(
                    ':enter, :leave',
                    style({ position: 'absolute', top: 0, left: 0, right: 0 })
                ),
                group([
                    query(':leave', [
                        animate(
                            '.5s cubic-bezier(.35, 0, .25, 1)',
                            style({ transform: 'translateX(-150%)' })
                        ),
                    ]),
                    query(':enter', [
                        animate(
                            '.5s cubic-bezier(.35, 0, .25, 1)',
                            style({ transform: 'translateX(0)' })
                        ),
                    ]),
                ]),
            ]),
            transition('users => translate', [
                style({ height: '!' }),
                query(':enter', style({ transform: 'translateX(-150%)' })),
                query(
                    ':enter, :leave',
                    style({ position: 'absolute', top: 0, left: 0, right: 0 })
                ),
                group([
                    query(':leave', [
                        animate(
                            '.5s cubic-bezier(.35, 0, .25, 1)',
                            style({ transform: 'translateX(150%)' })
                        ),
                    ]),
                    query(':enter', [
                        animate(
                            '.5s cubic-bezier(.35, 0, .25, 1)',
                            style({ transform: 'translateX(0)' })
                        ),
                    ]),
                ]),
            ]),
        ]),
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
            { icon: 'account_box', label: 'Users', path: '/users' },
        ];
    }

    public signOut(): void {
        this.authService.logOut();
        this._router.navigate(['/login']);
    }
}
