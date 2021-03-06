import { animate, style, transition, trigger } from '@angular/animations';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
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
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('popAnimation', [
            transition(':enter', [
                style({ transform: 'scale(0.5)', opacity: 0 }),
                animate(
                    '.5s cubic-bezier(.8, -0.6, 0.2, 1.5)',
                    style({ transform: 'scale(1)', opacity: 1 })
                ),
            ]),
            transition(':leave', [
                animate(
                    '.5s cubic-bezier(.8, -0.6, 0.2, 1.5)',
                    style({
                        transform: 'scale(0.5)',
                        opacity: 0,
                    })
                ),
            ]),
        ]),
    ],
})
export class TranslateOverviewComponent implements AfterViewInit, OnDestroy {
    private _cancelRequest: boolean;
    private _unsubscribe$: Subject<void>;
    public isTranslating: boolean;
    public micStatus: string;
    public translation: Translation;
    @ViewChild('input') private _textarea: ElementRef;
    @ViewChild('speech', { read: ElementRef })
    private _speech: ElementRef;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _ottomanService: OttomanService,
        private _pageTitleService: PageTitleService,
        private _snackbarService: SnackbarService,
        private _speechService: SpeechService
    ) {
        this._pageTitleService.title = 'Translate';
        this._unsubscribe$ = new Subject<void>();
        this.micStatus = 'mic';
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
                this.micStatus = 'mic';
                this._changeDetectorRef.detectChanges();
                this._snackbarService.notify('Listening...');
            }),
            switchMap(() =>
                this._speechService.listen().pipe(
                    catchError(err => {
                        let message;
                        if (err.error === 'not-allowed') {
                            message = 'Insufficient permissions';
                            this.micStatus = 'mic_off';
                        } else {
                            message = 'No speech detected';
                            this.micStatus = 'mic_none';
                        }
                        this._changeDetectorRef.detectChanges();
                        this._snackbarService.notify(message);
                        return of([]);
                    })
                )
            ),
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
                    this._changeDetectorRef.detectChanges();
                    this._cancelRequest = false;
                    return this._ottomanService.translate(res);
                })
            )
            .subscribe(
                (t: Translation) => {
                    if (!this._cancelRequest) {
                        this.isTranslating = false;
                        this.translation = t;
                        this._changeDetectorRef.detectChanges();
                    }
                },
                err => {
                    this._snackbarService.notify('Translation error');
                }
            );
    }

    public ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }

    /**
     * Clears the textarea content and cancels any ongoing translation request
     */
    public clear(): void {
        this.translation = null;
        this.isTranslating = false;
        this._textarea.nativeElement.value = '';
        this._textarea.nativeElement.focus();
        this._cancelRequest = true;
    }
}
