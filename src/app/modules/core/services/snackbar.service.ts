import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

/**
 * Used for displaying various snackbar notifications
 * @author Muhammed Sari <hi@muhammedsari.me>
 */
@Injectable()
export class SnackbarService {
    constructor(private _snackbar: MatSnackBar) {}

    public notify(message: string, duration: number = 3000): void {
        this._snackbar.open(message, 'Close', { duration });
    }
}
