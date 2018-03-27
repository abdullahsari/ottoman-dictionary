import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { ShellComponent } from './components/shell/shell.component';
import { AnonymousGuard } from './modules/core/guards/anonymous.guard';
import { AuthGuard } from './modules/core/guards/auth.guard';

export const declarations = [LoginComponent, ShellComponent];

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: ShellComponent,
        data: { state: 'shell' },
        children: [
            {
                path: '',
                redirectTo: '/translate',
                pathMatch: 'full',
            },
            {
                data: { state: 'translate' },
                path: 'translate',
                loadChildren:
                    './modules/translate/translate.module#TranslateModule',
            },
            {
                data: { state: 'users' },
                path: 'users',
                loadChildren: './modules/users/users.module#UsersModule',
            },
        ],
    },
    {
        path: 'login',
        canActivate: [AnonymousGuard],
        component: LoginComponent,
        data: { state: 'login' },
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
