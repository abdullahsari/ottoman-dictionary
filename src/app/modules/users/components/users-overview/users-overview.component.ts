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

/**
 * Displays a list of users
 * @author Muhammed Sari <hi@muhammedsari.me>
 */
@Component({
    selector: 'app-users-overview',
    templateUrl: './users-overview.component.html',
    styleUrls: ['./users-overview.component.scss'],
    animations: [
        trigger('colorAnimation', [
            transition(':enter', animate(0)),
            transition('* => ONLINE', [
                style({ backgroundColor: 'rgba(36, 210, 101, 0.2)' }),
                animate(
                    '1s cubic-bezier(1, .04, .66, .47)',
                    style({ backgroundColor: '#fff' })
                ),
            ]),
            transition('* => IDLE', [
                style({ backgroundColor: 'rgba(255, 223, 89, 0.2)' }),
                animate(
                    '1s cubic-bezier(1, .04, .66, .47)',
                    style({ backgroundColor: '#fff' })
                ),
            ]),
            transition('* => OFFLINE', [
                style({ backgroundColor: 'rgba(255, 53, 98, 0.2)' }),
                animate(
                    '1s cubic-bezier(1, .04, .66, .47)',
                    style({ backgroundColor: '#fff' })
                ),
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
