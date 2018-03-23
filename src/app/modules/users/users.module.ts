import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { UserStatusComponent } from './components/user-status/user-status.component';
import { UsersService } from './services/users.service';
import { UsersRoutingModule, declarations } from './users-routing.module';

@NgModule({
    imports: [SharedModule, UsersRoutingModule],
    declarations: [UserStatusComponent, ...declarations],
    providers: [UsersService],
})
export class UsersModule {}
