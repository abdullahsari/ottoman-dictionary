import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
} from '@angular/material';

import { RelativeTimePipe } from './pipes/relative-time.pipe';

const declarations = [RelativeTimePipe];

const modules = [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
];

@NgModule({
    imports: [...modules],
    exports: [...modules, ...declarations],
    declarations,
})
export class SharedModule {}
