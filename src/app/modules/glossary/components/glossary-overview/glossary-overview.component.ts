import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { slideAnimation } from '../../../../common/helpers/animations';
import { NavLink } from '../../../../common/models/nav-link.interface';
import { PageTitleService } from '../../../core/services/page-title.service';

@Component({
    selector: 'app-glossary-overview',
    templateUrl: './glossary-overview.component.html',
    styleUrls: ['./glossary-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlossaryOverviewComponent {
    constructor(private _pageTitleService: PageTitleService) {
        _pageTitleService.title = 'Glossary';
    }
}
