import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { slideAnimation } from '../../../../common/helpers/animations';
import { NavLink } from '../../../../common/models/nav-link.interface';
import { PageTitleService } from '../../../core/services/page-title.service';

@Component({
    selector: 'app-glossary-overview',
    templateUrl: './glossary-overview.component.html',
    styleUrls: ['./glossary-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        slideAnimation(
            'history => memorized, history => starred, history => entries, memorized => starred, memorized => entries, starred => entries',
            'entries => starred, entries => memorized, entries => history, starred => memorized, starred => history, memorized => history'
        ),
    ],
})
export class GlossaryOverviewComponent implements OnInit {
    public navLinks: NavLink[];

    constructor(private _pageTitleService: PageTitleService) {
        _pageTitleService.title = 'Glossary';
    }

    public ngOnInit(): void {
        this.navLinks = [
            { path: '.', icon: 'book' },
            { path: 'starred', icon: 'grade' },
            { path: 'memorized', icon: 'done' },
            { path: 'history', icon: 'history' },
        ];
    }
}
