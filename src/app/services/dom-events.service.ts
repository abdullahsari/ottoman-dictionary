import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

/**
 * Service for handling events on DOM elements
 * @author Muhammed Sari <hi@muhammedsari.me>
 */
@Injectable()
export class DOMEventsService {
    constructor(@Inject(DOCUMENT) private _document: HTMLElement) {}

    /**
     * Dispatches a custom event from the window.document object
     * @param {string} eventType The custom event to fire
     * @returns {Event} The fired event
     */
    public triggerOnDocument(eventType: string): Event {
        return this.triggerOnElement(this._document, eventType);
    }

    /**
     * Creates a custom event and dispatches the provided event type
     * @param {HTMLElement} nativeElement The element to dispatch the event from
     * @param {string} eventType The event type
     * @param {boolean} bubbles True to bubble, false to capture
     * @param {boolean} cancelable True or false
     * @returns {Event} The fired event
     */
    private triggerOnElement(
        nativeElement: HTMLElement,
        eventType: string,
        bubbles: boolean = true,
        cancelable: boolean = false
    ): Event {
        const customEvent = new CustomEvent(eventType, { bubbles, cancelable });
        nativeElement.dispatchEvent(customEvent);
        return customEvent;
    }
}
