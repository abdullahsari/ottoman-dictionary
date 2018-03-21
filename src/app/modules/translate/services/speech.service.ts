import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SpeechService {
    private readonly LANG: string = 'tr-TR';
    private _speech: any;

    constructor(@Inject('speech') private _speechRecognition: any) {
        this._speech = new _speechRecognition();
        this._speech.lang = this.LANG;
    }

    public listen(): Observable<string[]> {
        return new Observable<string[]>(observer => {
            const resultHandler = (e: any) => {
                observer.next(this.cleanSpeechResults(e.results));
                observer.complete();
            };

            const errorHandler = err => {
                observer.error(err);
            };

            this._speech.addEventListener('result', resultHandler);
            this._speech.addEventListener('error', errorHandler);
            this._speech.start();

            return () => {
                this._speech.removeEventListener('result', resultHandler);
                this._speech.removeEventListener('error', errorHandler);
                this._speech.abort();
            };
        });
    }

    private cleanSpeechResults(results: any): string[] {
        return Array.from(results).reduce(
            (final: string[], result: any) =>
                final.concat(Array.from(result, (x: any) => x.transcript)),
            []
        ) as string[];
    }
}
