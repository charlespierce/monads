export interface MaybeCase<T, U> {
    just: (value: T) => U;
    nothing: () => U;
}

export interface Nothing {
    match: <T, U>(pattern: MaybeCase<T, U>) => U;
}

export interface Just<T> {
    match: <U>(pattern: MaybeCase<T, U>) => U;
}

export interface Maybe<T> {
    match: <U>(pattern: MaybeCase<T, U>) => U;
}

const nothingInstance: Nothing = {
    match: <T, U>(pattern: MaybeCase<T, U>) => pattern.nothing()
};

export function Nothing(): Nothing {
    return nothingInstance;
}

export function Just<T>(value: T): Just<T> {
    return {
        match: <U>(pattern: MaybeCase<T, U>) => pattern.just(value)
    };
}

export const map = <T, U>(fn: (value: T) => U) => (maybe: Maybe<T>) => maybe.match<Maybe<U>>({
    just: (value: T) => Just(fn(value)),
    nothing: () => nothingInstance
});

export const bind = <T, U>(fn: (value: T) => Maybe<U>) => (maybe: Maybe<T>) => maybe.match<Maybe<U>>({
    just: (value: T) => fn(value),
    nothing: () => nothingInstance
});
