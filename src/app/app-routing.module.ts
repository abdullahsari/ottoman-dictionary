import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { ShellComponent } from './components/shell/shell.component';
import { AnonymousGuard } from './guards/anonymous.guard';
import { AuthGuard } from './guards/auth.guard';

export const declarations = [LoginComponent, ShellComponent];
export const providers = [AuthGuard, AnonymousGuard];

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: ShellComponent,
        children: [
            {
                path: '',
                redirectTo: '/translate',
                pathMatch: 'full',
            },
            {
                path: 'translate',
                loadChildren:
                    './modules/translate/translate.module#TranslateModule',
            },
        ],
    },
    {
        path: 'login',
        canActivate: [AnonymousGuard],
        component: LoginComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
