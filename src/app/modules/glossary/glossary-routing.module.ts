import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EntriesComponent } from './components/entries/entries.component';
import { GlossaryOverviewComponent } from './components/glossary-overview/glossary-overview.component';
import { HistoryComponent } from './components/history/history.component';
import { MemorizedComponent } from './components/memorized/memorized.component';
import { StarredComponent } from './components/starred/starred.component';

export const declarations = [
    EntriesComponent,
    GlossaryOverviewComponent,
    HistoryComponent,
    MemorizedComponent,
    StarredComponent,
];

const routes: Routes = [
    {
        path: '',
        component: GlossaryOverviewComponent,
        children: [
            {
                path: '',
                component: EntriesComponent,
                data: { state: 'entries' },
            },
            {
                path: 'history',
                component: HistoryComponent,
                data: { state: 'history' },
            },
            {
                path: 'memorized',
                component: MemorizedComponent,
                data: { state: 'memorized' },
            },
            {
                path: 'starred',
                component: StarredComponent,
                data: { state: 'starred' },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GlossaryRoutingModule {}
