import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-starred',
    templateUrl: './starred.component.html',
    styleUrls: ['./starred.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarredComponent {
    constructor() {}
}
