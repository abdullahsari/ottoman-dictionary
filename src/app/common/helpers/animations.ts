import {
    AnimationTriggerMetadata,
    animate,
    group,
    query,
    style,
    transition,
    trigger,
} from '@angular/animations';

////////////////////////////////////////////////////////////////////////////////
// Content slide animation, ideal for tab navigations
////////////////////////////////////////////////////////////////////////////////
export function slideAnimation(
    rtlStates: string,
    ltrStates: string
): AnimationTriggerMetadata {
    return trigger('slideAnimation', [
        transition(rtlStates, [
            style({ height: '!' }),
            query(':enter', style({ transform: 'translateX(200%)' })),
            query(
                ':enter, :leave',
                style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                })
            ),
            group([
                query(':leave', [
                    animate(
                        '.75s cubic-bezier(.35, 0, .25, 1)',
                        style({ transform: 'translateX(-200%)' })
                    ),
                ]),
                query(':enter', [
                    animate(
                        '.75s cubic-bezier(.35, 0, .25, 1)',
                        style({ transform: 'translateX(0)' })
                    ),
                ]),
            ]),
        ]),
        transition(ltrStates, [
            style({ height: '!' }),
            query(':enter', style({ transform: 'translateX(-200%)' })),
            query(
                ':enter, :leave',
                style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                })
            ),
            group([
                query(':leave', [
                    animate(
                        '.75s cubic-bezier(.35, 0, .25, 1)',
                        style({ transform: 'translateX(200%)' })
                    ),
                ]),
                query(':enter', [
                    animate(
                        '.75s cubic-bezier(.35, 0, .25, 1)',
                        style({ transform: 'translateX(0)' })
                    ),
                ]),
            ]),
        ]),
    ]);
}
