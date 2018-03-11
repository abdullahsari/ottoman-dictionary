import { animate, style, transition, trigger } from '@angular/animations';
import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { filter } from 'rxjs/operators/filter';
import { pluck } from 'rxjs/operators/pluck';
import { switchMap } from 'rxjs/operators/switchMap';

import { Translation } from '../../../../shared/models/translation.interface';
import { SnackbarService } from '../../../../shared/services/snackbar.service';
import { OttomanService } from '../../services/ottoman.service';

/**
 * The overview component for translating
 * @author Muhammed Sari <hi@muhammedsari.me>
 */
@Component({
    selector: 'app-translate-overview',
    templateUrl: './translate-overview.component.html',
    styleUrls: ['./translate-overview.component.scss'],
    animations: [
        trigger('popAnimation', [
            transition(':enter', [
                style({ transform: 'scale(0)', opacity: 0 }),
                animate(
                    '.2s ease-out',
                    style({ transform: 'scale(1)', opacity: 1 })
                ),
            ]),
            transition(':leave', [
                animate(
                    '.2s ease-in',
                    style({ transform: 'scale(0)', opacity: 0 })
                ),
            ]),
        ]),
    ],
})
export class TranslateOverviewComponent
    implements AfterViewInit, OnDestroy, OnInit {
    private _subscription: Subscription;
    public isTranslating: boolean;
    public translation: Translation;
    @ViewChild('input') private _textarea: ElementRef;

    constructor(
        private _ottomanService: OttomanService,
        private _snackbarService: SnackbarService
    ) {}

    public ngAfterViewInit(): void {
        this._subscription = fromEvent(this._textarea.nativeElement, 'input')
            .pipe(
                distinctUntilChanged(),
                debounceTime(500),
                pluck('srcElement', 'value'),
                filter(word => {
                    const bool = word !== '';
                    if (!bool) this.translation = null;
                    return bool;
                }),
                switchMap((word: string) => {
                    this.isTranslating = true;
                    return this._ottomanService.translate(word);
                }),
                catchError(err => {
                    if (err instanceof TypeError) {
                        return of({
                            searched: 'Could not translate',
                            results: [],
                        });
                    }
                    return ErrorObservable.create(err);
                })
            )
            .subscribe(
                (t: Translation) => {
                    this.translation = t;
                    this.isTranslating = false;
                },
                err => {
                    this._snackbarService.notify(
                        'Error while attempting the translation.'
                    );
                }
            );
    }

    public ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    public ngOnInit(): void {}

    /**
     * Clears the textarea content
     */
    public clearInput(): void {
        this._textarea.nativeElement.value = '';
        this._textarea.nativeElement.focus();
        this.translation = null;
    }
}
