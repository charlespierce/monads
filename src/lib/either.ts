import { Monad } from './monad';

interface Either<E, T> extends Monad<T> {
    map<U>(func: (v: T) => U): Either<E, U>;
    bind<U>(func: (v: T) => Either<E, U>): Either<E, U>;
    case(cases: EitherCase<E, T>): void;
}

export interface EitherCase<E, T> {
    left(error: E): void;
    right(value: T): void;
}

export function Right<E, T>(value: T): Either<E, T> {
    return {
        map: <U>(func: (v: T) => U) => Right<E, U>(func(value)),
        bind: <U>(func: (v: T) => Either<E, T>) => func(value),
        case: (cases: EitherCase<E, T>) => cases.right(value),
        toString: () => `Right { ${value} }`
    };
}

export function Left<E, T>(error: E): Either<E, T> {
    return {
        map: <U>(func: (v: T) => U) => Left<E, U>(error),
        bind: <U>(func: (v: T) => Either<E, T>) => Left<E, U>(error),
        case: (cases: EitherCase<E, T>) => cases.left(error),
        toString: () => `Left { ${error} }`
    };
}
