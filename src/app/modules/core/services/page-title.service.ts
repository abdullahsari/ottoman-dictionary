import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { APP_TITLE } from '../../../common/constants';

/**
 * Service for setting a page's title
 * @author Muhammed Sari <hi@muhammedsari.me>
 */
@Injectable()
export class PageTitleService {
    private _title: string;

    constructor(private _pageTitle: Title) {
        this._title = APP_TITLE;
    }

    public get title(): string {
        return this._title;
    }

    public set title(title: string) {
        this._title = title || '';
        this._pageTitle.setTitle((title ? title + ' | ' : '') + APP_TITLE);
    }
}
