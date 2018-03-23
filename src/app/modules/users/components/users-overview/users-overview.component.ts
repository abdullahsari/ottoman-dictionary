import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../../../../common/models/user.interface';
import { PageTitleService } from '../../../core/services/page-title.service';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'app-users-overview',
    templateUrl: './users-overview.component.html',
    styleUrls: ['./users-overview.component.scss'],
})
export class UsersOverviewComponent implements OnInit {
    public users$: Observable<User[]>;

    constructor(
        private _pageTitleService: PageTitleService,
        private _usersService: UsersService
    ) {
        _pageTitleService.title = 'Users';
    }

    public ngOnInit(): void {
        this.users$ = this._usersService.fetchAll();
    }
}
