import { Component } from '@angular/core';

import { PageTitleService } from '../../../core/services/page-title.service';

@Component({
    selector: 'app-users-overview',
    templateUrl: './users-overview.component.html',
    styleUrls: ['./users-overview.component.scss'],
})
export class UsersOverviewComponent {
    constructor(private _pageTitleService: PageTitleService) {
        _pageTitleService.title = 'Users';
    }
}
