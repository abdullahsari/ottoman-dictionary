import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { SocialType } from '../../common/models/social-type.enum';

/**
 * The root component
 * @author Muhammed Sari <hi@muhammedsari.me>
 */
@Component({
    selector: 'app-root',
    template: '<router-outlet></router-outlet>',
})
export class AppComponent {
    constructor(
        private _domSanitizer: DomSanitizer,
        private _iconRegistry: MatIconRegistry
    ) {
        // Define the SVG icon sets
        const svgIconSets = [
            {
                dir: 'social',
                namespace: 'social',
                icons: Object.keys(SocialType).map(key => SocialType[key]),
            },
        ];

        // Register the icons
        svgIconSets.forEach(set => {
            set.icons.forEach(icon => {
                this._iconRegistry.addSvgIconInNamespace(
                    set.namespace,
                    icon.toLowerCase(),
                    this._domSanitizer.bypassSecurityTrustResourceUrl(
                        `./assets/img/icons/${set.dir}/${icon}.svg`
                    )
                );
            });
        });
    }
}
