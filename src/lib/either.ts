import { Monad } from './monad';

export abstract class Either<E, T> implements Monad<T> {
    protected constructor() {}

    public abstract map<U>(func: (value: T) => U): Either<E, U>;
    public abstract bind<U>(func: (value: T) => Either<E, U>): Either<E, U>;
    public abstract equals(other: Either<E, T>): boolean;

    public unit(value: T): Either<E, T> {
        return Either.right<E, T>(value);
    }

    public static right<E, T>(value: T): Either<E, T> {
        if (value == null) {
            throw new TypeError("Right value cannot be null");
        }
        return new Right<E, T>(value);
    }

    public static left<E, T>(error: E): Either<E, T> {
        return new Left<E, T>(error);
    }
}

class Right<E, T> extends Either<E, T> {
    constructor(private value: T) {
        super();
    }

    public map<U>(func: (value: T) => U): Either<E, U> {
        return new Right<E, U>(func(this.value));
    }

    public bind<U>(func: (value: T) => Either<E, U>): Either<E, U> {
        return func(this.value);
    }

    public equals(other: Either<E, T>): boolean {
        return other === this || (other instanceof Right && other.value === this.value);
    }
}

class Left<E, T> extends Either<E, T> {
    constructor(private error: E) {
        super();
    }

    public map<U>(func: (value: T) => U): Either<E, U> {
        return new Left<E, U>(this.error);
    }

    public bind<U>(func: (value: T) => Either<E, U>): Either<E, U> {
        return new Left<E, U>(this.error);
    }

    public equals(other: Either<E, T>): boolean {
        return other === this || (other instanceof Left && other.error === this.error);
    }
}
