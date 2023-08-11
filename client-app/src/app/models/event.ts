export interface UserEvent {
    id: string,
    title: string,
    category: string,
    date: string,
}

export enum EventPredicate {
    HOSTING = 'hosting',
    PAST = 'past',
    FUTURE = 'future'
}