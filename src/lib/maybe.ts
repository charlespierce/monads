import { Monad } from './monad';

export abstract class Maybe<T> implements Monad<T> {
    protected constructor(){}

    public abstract map<U>(func: (value: T) => U): Maybe<U>;
    public abstract bind<U>(func: (value: T) => Maybe<U>): Maybe<U>;
    public abstract equals(other: Maybe<T>): boolean;

    public unit<T>(value: T): Maybe<T> {
        return Maybe.just(value);
    }

    public static just<T>(value: T): Maybe<T> {
        if (value == null) {
            throw new TypeError("Just value cannot be null!");
        }
        return new Just(value);
    }

    public static nothing<T>(): Maybe<T> {
        return new Nothing<T>();
    }
}

class Just<T> extends Maybe<T> {
    constructor(private value: T) {
        super();
    }

    public map<U>(func: (value: T) => U): Maybe<U> {
        return new Just(func(this.value));
    }

    public bind<U>(func: (value: T) => Maybe<U>): Maybe<U> {
        return func(this.value);
    }

    public equals(other: Maybe<T>): boolean {
        return this === other || (other instanceof Just && (<Just<T>>other).value === this.value);
    }
}

class Nothing<T> extends Maybe<T> {
    constructor() {
        super();
    }

    public map<U>(func: (value: T) => U): Maybe<U> {
        return new Nothing<U>();
    }

    public bind<U>(func: (value: T) => Maybe<U>): Maybe<U> {
        return new Nothing<U>();
    }

    public equals(other: Maybe<T>): boolean {
        return this === other || other instanceof Nothing;
    }
}
