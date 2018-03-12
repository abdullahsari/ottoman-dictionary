import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TranslateOverviewComponent } from './components/translate-overview/translate-overview.component';

const routes: Routes = [
    {
        path: '',
        component: TranslateOverviewComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TranslateRoutingModule {}
