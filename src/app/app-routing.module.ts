import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const declarations = [LoginComponent];
export const providers = [AuthGuard];

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'translate',
        canActivate: [AuthGuard],
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
