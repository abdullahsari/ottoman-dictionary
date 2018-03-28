import { Pipe, PipeTransform } from '@angular/core';

/**
 * Changes points of time into human-readable relative time references
 * @author Muhammed Sari <muhammed@influo.be>
 */
@Pipe({ name: 'relativeTime', pure: true })
export class RelativeTimePipe implements PipeTransform {
    public transform(value: Date | number): string {
        const now = new Date();
        const then = value instanceof Date ? value : new Date(value);
        const difference = (now.getTime() - then.getTime()) / 1000; // in seconds

        // seconds
        if (difference < 60) return 'less than a minute ago';

        // minutes
        if (difference < 3600) {
            const minutes = Math.floor(difference / 60);
            return minutes + ` minute${minutes === 1 ? '' : 's'} ago`;
        }

        // hours
        if (difference < 86400) {
            const hours = Math.floor(difference / 3600);
            return hours + ` hour${hours === 1 ? '' : 's'} ago`;
        }

        // days
        if (difference < 604800) {
            const days = Math.floor(difference / 86400);
            return days === 1 ? 'yesterday' : days + ` days ago`;
        }

        // weeks
        if (difference < 2678400) {
            const weeks = Math.floor(difference / 604800);
            return weeks + ` week${weeks === 1 ? '' : 's'} ago`;
        }

        // months
        if (difference < 31557600) {
            const months = Math.floor(difference / 2678400);
            return months + ` month${months === 1 ? '' : 's'} ago`;
        }

        // years
        return 'more than a year ago';
    }
}
