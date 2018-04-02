import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-entries',
    templateUrl: './entries.component.html',
    styleUrls: ['./entries.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntriesComponent {
    constructor() {}
}
