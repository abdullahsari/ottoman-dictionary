import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { GlossaryRoutingModule, declarations } from './glossary-routing.module';
import { GlossaryService } from './services/glossary.service';

@NgModule({
    imports: [GlossaryRoutingModule, SharedModule],
    declarations,
    providers: [GlossaryService],
})
export class GlossaryModule {}
