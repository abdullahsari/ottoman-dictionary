import { Status } from './status.enum';

export interface User {
    displayName: string;
    email: string;
    lastActive: number;
    photoURL: string;
    status: Status;
    uid: string;
}
