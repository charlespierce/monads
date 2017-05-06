import { Monad } from './monad';
import { compose } from './utils';

interface IO<T> extends Monad<T> {
    map<U>(func: (v: T) => U): IO<U>;
    bind<U>(func: (v: T) => IO<U>): IO<U>;
    bindOver<U>(func: () => IO<U>): IO<U>;
    execute(): T;
}

function createIO<T>(execute: () => T): IO<T> {
    return {
        map: <U>(func: (v: T) => U) => createIO(compose(func, execute)),
        bind: <U>(func: (value: T) => IO<U>) => createIO(() => func(execute()).execute()),
        bindOver: <U>(func: () => IO<U>) => createIO(() => {
            execute();
            return func().execute();
        }),
        execute
    }
}

export function Log(value: string): IO<void> {
    return createIO(() => {
        console.log(value);
    });
}
