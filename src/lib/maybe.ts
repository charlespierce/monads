import { Monad } from './monad';

interface Maybe<T> extends Monad<T> {
    map<U>(func: (v: T) => U): Maybe<U>;
    bind<U>(func: (v: T) => Maybe<U>): Maybe<U>;
    case(cases: MaybeCase<T>): void;
}

export interface MaybeCase<T> {
    just(value: T): void;
    nothing(): void;
}

export function Just<T>(value: T): Maybe<T> {
    return {
        map: <U>(func: (v: T) => U) => Just(func(value)),
        bind: <U>(func: (v: T) => Maybe<U>) => func(value),
        case: (cases: MaybeCase<T>) => cases.just(value),
        toString: () => `Just { ${value} }`
    }
}

export function Nothing<T>(): Maybe<T> {
    return {
        map: <U>(func: (v: T) => U) => Nothing<U>(),
        bind: <U>(func: (v: T) => Maybe<U>) => Nothing<U>(),
        case: (cases: MaybeCase<T>) => cases.nothing(),
        toString: () => 'Nothing'
    }
}
