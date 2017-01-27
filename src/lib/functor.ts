import { Comparable } from './comparable';

export interface Functor<T> extends Comparable {
    map<U>(func: (value: T) => U): Functor<U>;
}
