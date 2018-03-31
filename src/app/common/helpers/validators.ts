import { AbstractControl, ValidatorFn } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { first } from 'rxjs/operators/first';
import { map } from 'rxjs/operators/map';

////////////////////////////////////////////////////////////////////////////////
// Checks if the given word already exists in the glossary
////////////////////////////////////////////////////////////////////////////////
export function ExistenceValidator(
    afDb: AngularFireDatabase,
    uid: string
): ValidatorFn {
    return (control: AbstractControl) => {
        const word = control.value;
        return afDb
            .list('/glossary/' + uid, ref => ref.equalTo(word))
            .valueChanges()
            .pipe(first(), map(arr => (arr.length ? { exists: true } : null)));
    };
}
