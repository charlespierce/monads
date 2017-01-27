import { Functor } from './functor';

export interface Monad<T> extends Functor<T> {
    unit(value: T): Monad<T>;
    bind<U>(func: (value: T) => Monad<U>): Monad<U>;
}
