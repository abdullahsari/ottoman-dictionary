import { animate, style, transition, trigger } from '@angular/animations';
import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { tap } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { filter } from 'rxjs/operators/filter';
import { pluck } from 'rxjs/operators/pluck';
import { switchMap } from 'rxjs/operators/switchMap';

import { Translation } from '../../../../common/models/translation.interface';
import { SnackbarService } from '../../../core/services/snackbar.service';
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
                pluck('srcElement', 'value'),
                tap(word => {
                    if (word === '') this.clear();
                }),
                debounceTime(500),
                distinctUntilChanged(),
                filter(word => word !== ''),
                switchMap((word: string) => {
                    this.isTranslating = true;
                    this._cancelRequest = false;
                    return this._ottomanService.translate(word);
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
        this._subscription.unsubscribe();
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
