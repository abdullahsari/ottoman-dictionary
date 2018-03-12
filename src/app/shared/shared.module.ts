import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material';

import { SnackbarService } from './services/snackbar.service';

@NgModule({
    imports: [CommonModule, MatSnackBarModule],
    providers: [SnackbarService],
})
export class SharedModule {}
