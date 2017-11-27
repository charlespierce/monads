export interface EitherCase<E, T, U> {
    left: (error: E) => U;
    right: (value: T) => U;
}

export interface Left<E> {
    match: <T, U>(pattern: EitherCase<E, T, U>) => U;
}

export interface Right<T> {
    match: <E, U>(pattern: EitherCase<E, T, U>) => U;
}

export interface Either<E, T> {
    match: <U>(pattern: EitherCase<E, T, U>) => U;
}

export function Left<E>(error: E): Left<E> {
    return {
        match: <T, U>(pattern: EitherCase<E, T, U>) => pattern.left(error)
    };
}

export function Right<T>(value: T): Right<T> {
    return {
        match: <E, U>(pattern: EitherCase<E, T, U>) => pattern.right(value)
    };
}

export const map = <E, T, U>(fn: (value: T) => U) => (either: Either<E, T>) => either.match<Either<E, U>>({
    left: (error: E) => Left(error),
    right: (value: T) => Right(fn(value))
});

export const bind = <E, T, U>(fn: (value: T) => Either<E, U>) => (either: Either<E, T>) => either.match<Either<E, U>>({
    left: (error: E) => Left(error),
    right: (value: T) => fn(value)
});
