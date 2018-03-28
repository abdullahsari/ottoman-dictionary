import { ChangeDetectionStrategy, Component } from '@angular/core';

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
