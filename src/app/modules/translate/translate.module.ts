import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { TranslateOverviewComponent } from './components/translate-overview/translate-overview.component';
import { webSpeechFactory } from './factories/web-speech.factory';
import { OttomanService } from './services/ottoman.service';
import { SpeechService } from './services/speech.service';
import { TranslateService } from './services/translate.service';
import { TranslateRoutingModule } from './translate-routing.module';

@NgModule({
    imports: [SharedModule, TranslateRoutingModule],
    declarations: [TranslateOverviewComponent],
    providers: [
        OttomanService,
        { provide: 'speech', useFactory: webSpeechFactory },
        SpeechService,
        TranslateService,
    ],
})
export class TranslateModule {}
