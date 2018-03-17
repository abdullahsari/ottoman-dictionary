import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
} from '@angular/material';

import { DOMEventsService } from './services/dom-events.service';
import { SnackbarService } from './services/snackbar.service';

const materials = [
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
];

@NgModule({
    imports: [...materials],
    exports: [...materials],
    providers: [DOMEventsService, SnackbarService],
})
export class SharedModule {}
