import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TranslateOverviewComponent } from './components/translate-overview/translate-overview.component';
import { OttomanService } from './services/ottoman.service';
import { TranslateRoutingModule } from './translate-routing.module';

@NgModule({
    imports: [CommonModule, TranslateRoutingModule],
    declarations: [TranslateOverviewComponent],
    providers: [OttomanService],
})
export class TranslateModule {}
