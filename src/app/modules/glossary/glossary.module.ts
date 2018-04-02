import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { GlossaryRoutingModule, declarations } from './glossary-routing.module';

@NgModule({
    imports: [GlossaryRoutingModule, SharedModule],
    declarations,
})
export class GlossaryModule {}
