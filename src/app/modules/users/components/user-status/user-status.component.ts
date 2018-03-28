import { Component, Input } from '@angular/core';

import { Status } from '../../../../common/models/status.enum';

/**
 * Visualizes user statuses
 * @author Muhammed Sari <hi@muhammedsari.me>
 */
@Component({
    selector: 'app-user-status',
    templateUrl: './user-status.component.html',
    styleUrls: ['./user-status.component.scss'],
})
export class UserStatusComponent {
    @Input() public status: Status;
}
