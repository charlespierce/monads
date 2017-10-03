import { Monad } from './monad';

interface Maybe<T> extends Monad<T> {
    map<U>(func: (v: T) => U): Maybe<U>;
    bind<U>(func: (v: T) => Maybe<U>): Maybe<U>;
    match<U>(pattern: MaybePattern<T, U>): U;
}

export interface MaybePattern<T, U> {
    just(value: T): U;
    nothing(): U;
}

export function Just<T>(value: T): Maybe<T> {
    return {
        map: <U>(func: (v: T) => U) => Just(func(value)),
        bind: <U>(func: (v: T) => Maybe<U>) => func(value),
        match: <U>(pattern: MaybePattern<T, U>) => pattern.just(value),
    }
}

export function Nothing<T>(): Maybe<T> {
    return {
        map: <U>(func: (v: T) => U) => Nothing(),
        bind: <U>(func: (v: T) => Maybe<U>) => Nothing(),
        match: <U>(pattern: MaybePattern<T, U>) => pattern.nothing(),
    }
}
