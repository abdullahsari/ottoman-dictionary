import { NgModule } from '@angular/core';

import { webSpeechFactory } from '../core/factories/web-speech.factory';
import { SharedModule } from '../shared/shared.module';

import { TranslateOverviewComponent } from './components/translate-overview/translate-overview.component';
import { OttomanService } from './services/ottoman.service';
import { SpeechService } from './services/speech.service';
import { TranslateRoutingModule } from './translate-routing.module';

@NgModule({
    imports: [SharedModule, TranslateRoutingModule],
    declarations: [TranslateOverviewComponent],
    providers: [
        OttomanService,
        { provide: 'speech', useFactory: webSpeechFactory },
        SpeechService,
    ],
})
export class TranslateModule {}
