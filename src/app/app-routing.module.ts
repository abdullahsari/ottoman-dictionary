import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';

export const declarations = [LoginComponent];

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'translate',
        loadChildren: './modules/translate/translate.module#TranslateModule',
    },
    {
        path: '',
        redirectTo: '/translate',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
