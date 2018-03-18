import { NgModule } from '@angular/core';

import { AnonymousGuard } from './guards/anonymous.guard';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { DOMEventsService } from './services/dom-events.service';
import { SnackbarService } from './services/snackbar.service';

@NgModule({
    providers: [
        AnonymousGuard,
        AuthGuard,
        AuthService,
        DOMEventsService,
        SnackbarService,
    ],
})
export class CoreModule {}
