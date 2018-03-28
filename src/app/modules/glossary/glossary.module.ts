import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { GlossaryOverviewComponent } from './components/glossary-overview/glossary-overview.component';
import { GlossaryRoutingModule } from './glossary-routing.module';

@NgModule({
    imports: [GlossaryRoutingModule, SharedModule],
    declarations: [GlossaryOverviewComponent],
})
export class GlossaryModule {}
