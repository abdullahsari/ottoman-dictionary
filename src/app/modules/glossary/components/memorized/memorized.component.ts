import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-memorized',
    templateUrl: './memorized.component.html',
    styleUrls: ['./memorized.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemorizedComponent {
    constructor() {}
}
