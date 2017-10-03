import { Monad } from './monad';

interface Either<E, T> extends Monad<T> {
    map<U>(func: (v: T) => U): Either<E, U>;
    bind<U>(func: (v: T) => Either<E, U>): Either<E, U>;
    match<U>(pattern: EitherPattern<E, T, U>): U;
}

export interface EitherPattern<E, T, U> {
    left(error: E): U;
    right(value: T): U;
}

export function Right<E, T>(value: T): Either<E, T> {
    return {
        map: <U>(func: (v: T) => U) => Right(func(value)),
        bind: <U>(func: (v: T) => Either<E, U>) => func(value),
        match: <U>(pattern: EitherPattern<E, T, U>) => pattern.right(value),
    };
}

export function Left<E, T>(error: E): Either<E, T> {
    return {
        map: <U>(func: (v: T) => U) => Left(error),
        bind: <U>(func: (v: T) => Either<E, U>) => Left(error),
        match: <U>(pattern: EitherPattern<E, T, U>) => pattern.left(error),
    };
}
