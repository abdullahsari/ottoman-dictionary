import { NgModule } from '@angular/core';

import { AnonymousGuard } from './guards/anonymous.guard';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { DOMEventsService } from './services/dom-events.service';
import { PageTitleService } from './services/page-title.service';
import { SnackbarService } from './services/snackbar.service';

@NgModule({
    providers: [
        AnonymousGuard,
        AuthGuard,
        AuthService,
        DOMEventsService,
        PageTitleService,
        SnackbarService,
    ],
})
export class CoreModule {}
