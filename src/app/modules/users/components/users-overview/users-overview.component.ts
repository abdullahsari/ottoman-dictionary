import {
    animate,
    query,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../../../../common/models/user.interface';
import { PageTitleService } from '../../../core/services/page-title.service';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'app-users-overview',
    templateUrl: './users-overview.component.html',
    styleUrls: ['./users-overview.component.scss'],
    animations: [
        trigger('statusAnimation', [
            transition(':enter', animate(0)),
            transition('* => *', [
                query(':enter', [
                    style({ opacity: '0' }),
                    animate('350ms ease-out', style({ opacity: '1' })),
                ]),
            ]),
        ]),
    ],
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

    public trackId(user: User): string {
        return user.uid;
    }
}
