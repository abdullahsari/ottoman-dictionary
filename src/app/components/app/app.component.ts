import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy, OnInit {
    private _mobileQueryListener: () => void;
    public mobileQuery: MediaQueryList;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _mediaMatcher: MediaMatcher
    ) {}

    public ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    public ngOnInit(): void {
        this.mobileQuery = this._mediaMatcher.matchMedia('(min-width: 961px)');
        this._mobileQueryListener = () =>
            this._changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }
}
