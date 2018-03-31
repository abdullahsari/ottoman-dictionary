import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';

import { SnackbarAction } from '../../../common/models/snackbar-action.enum';

/**
 * Used for displaying various snackbar notifications
 * @author Muhammed Sari <hi@muhammedsari.me>
 */
@Injectable()
export class SnackbarService {
    constructor(private _snackbar: MatSnackBar) {}

    public notify(
        message: string,
        action: string = SnackbarAction.Dismiss,
        duration: number = 3000
    ): MatSnackBarRef<SimpleSnackBar> {
        return this._snackbar.open(message, action, { duration });
    }
}
