import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
} from '@angular/material';

import { SharedModule } from '../../shared/shared.module';

import { TranslateOverviewComponent } from './components/translate-overview/translate-overview.component';
import { OttomanService } from './services/ottoman.service';
import { TranslateRoutingModule } from './translate-routing.module';

const materials = [
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
];

@NgModule({
    imports: [CommonModule, SharedModule, TranslateRoutingModule, ...materials],
    declarations: [TranslateOverviewComponent],
    providers: [OttomanService],
})
export class TranslateModule {}
