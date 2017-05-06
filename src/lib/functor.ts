export interface FunctorType<T> {
    (value: T): Functor<T>;
}

export interface Functor<T> {
    map<U>(func: (value: T) => U): Functor<U>;
}
