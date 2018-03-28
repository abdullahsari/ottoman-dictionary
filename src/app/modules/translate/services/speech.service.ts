import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/**
 * Service for the Web Speech API
 * @author Muhammed Sari <hi@muhammedsari.me>
 */
@Injectable()
export class SpeechService {
    private readonly LANG: string = 'tr-TR';

    constructor(@Inject('speech') private _speechRecognition: any) {}

    /**
     * Initiates the speech API and returns a stream of speech results
     * @returns {Observable<string[]>} A cold observable
     */
    public listen(): Observable<string[]> {
        return new Observable<string[]>(observer => {
            const speech = new this._speechRecognition();
            speech.lang = this.LANG;

            const resultHandler = (e: any) => {
                observer.next(this.cleanSpeechResults(e.results));
                observer.complete();
            };

            const errorHandler = err => {
                observer.error(err);
            };

            speech.addEventListener('result', resultHandler);
            speech.addEventListener('error', errorHandler);
            speech.start();

            return () => {
                speech.removeEventListener('result', resultHandler);
                speech.removeEventListener('error', errorHandler);
                speech.abort();
            };
        });
    }

    /**
     * Transforms Speech API results into a better shape
     * @param results The results from the Web Speech API
     * @returns {string[]} The transformed results
     */
    private cleanSpeechResults(results: any): string[] {
        return Array.from(results).reduce(
            (final: string[], result: any) =>
                final.concat(Array.from(result, (x: any) => x.transcript)),
            []
        ) as string[];
    }
}
