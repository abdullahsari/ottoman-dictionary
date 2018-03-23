import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersOverviewComponent } from './components/users-overview/users-overview.component';

export const declarations = [UsersOverviewComponent];

const routes: Routes = [
    {
        path: '',
        component: UsersOverviewComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UsersRoutingModule {}
