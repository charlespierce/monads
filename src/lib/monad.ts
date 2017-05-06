import { Functor } from './functor';

export interface MonadType<T> {
    (value: T): Monad<T>;
}

export interface Monad<T> extends Functor<T> {
    map<U>(func: (value: T) => U): Monad<U>;
    bind<U>(func: (value: T) => Monad<U>): Monad<U>;
}
