import { animate, style, transition, trigger } from '@angular/animations';
import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { merge } from 'rxjs/observable/merge';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { filter } from 'rxjs/operators/filter';
import { map } from 'rxjs/operators/map';
import { pluck } from 'rxjs/operators/pluck';
import { switchMap } from 'rxjs/operators/switchMap';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { tap } from 'rxjs/operators/tap';

import { Translation } from '../../../../common/models/translation.interface';
import { PageTitleService } from '../../../core/services/page-title.service';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { OttomanService } from '../../services/ottoman.service';
import { SpeechService } from '../../services/speech.service';

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
                style({ transform: 'scale(0.5)', opacity: 0 }),
                animate(
                    '.3s cubic-bezier(.8, -0.6, 0.26, 1.6)',
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
export class TranslateOverviewComponent implements AfterViewInit, OnDestroy {
    private _cancelRequest: boolean;
    private _glossary: string[];
    private _unsubscribe$: Subject<void>;
    public isTranslating: boolean;
    public translation: Translation;
    @ViewChild('input') private _textarea: ElementRef;
    @ViewChild('speech', { read: ElementRef })
    private _speech: ElementRef;

    constructor(
        private _ottomanService: OttomanService,
        private _pageTitleService: PageTitleService,
        private _snackbarService: SnackbarService,
        private _speechService: SpeechService
    ) {
        this._pageTitleService.title = 'Translate';
        this._unsubscribe$ = new Subject<void>();
    }

    public ngAfterViewInit(): void {
        // Text input
        const text$ = fromEvent(this._textarea.nativeElement, 'input').pipe(
            pluck('srcElement', 'value'),
            debounceTime(500),
            distinctUntilChanged()
        );

        // Verbal input
        const listen$ = fromEvent(this._speech.nativeElement, 'click').pipe(
            debounceTime(200),
            tap(() => {
                this._snackbarService.notify('Listening...');
            }),
            switchMap(() => this._speechService.listen()),
            catchError(err => {
                // TODO - prevent unsubscription
                const message =
                    err.error === 'not-allowed'
                        ? 'You must grant the required permissions to be able to use the speech to text functionality.'
                        : 'I think you have not said anything at all.';
                this._snackbarService.notify(message);
                return of([]);
            }),
            map((res: string[]) => res.join(' ')),
            tap(words => {
                this._textarea.nativeElement.value = words;
            })
        );

        // Combine input methods
        merge(text$, listen$)
            .pipe(
                takeUntil(this._unsubscribe$),
                tap(words => {
                    if (words === '') this.clear();
                }),
                filter(word => word !== ''),
                switchMap((res: string) => {
                    this.isTranslating = true;
                    this._cancelRequest = false;
                    return this._ottomanService.translate(res);
                })
            )
            .subscribe(
                (t: Translation) => {
                    if (!this._cancelRequest) {
                        this._glossary = [];
                        this.translation = t;
                        this.isTranslating = false;
                    }
                },
                err => {
                    this._snackbarService.notify(
                        'Error while attempting the translation.'
                    );
                }
            );
    }

    public ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }

    /**
     * Adds/removes translations
     * @param {string} entry The translation that should be added to the glossary
     */
    public toggle(entry: string): void {
        const idx = this._glossary.indexOf(entry);
        if (idx < 0) {
            this._glossary.push(entry);
        } else {
            this._glossary.splice(idx, 1);
        }
    }

    /**
     * Clears the textarea content and cancels any ongoing translation request
     */
    public clear(): void {
        this._textarea.nativeElement.value = '';
        this._textarea.nativeElement.focus();
        this.translation = null;
        this.isTranslating = false;
        this._cancelRequest = true;
    }
}
