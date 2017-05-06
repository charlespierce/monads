export function identity<T>(value: T): T {
    return value;
}

export function compose<A, B>(f: (v: A) => B, g: () => A): () => B;
export function compose<A, B, C>(f: (v: B) => C, g: (v: A) => B): (v: A) => C;
export function compose(f: any, g: any): any {
    return (v: any) => f(g(v));
}
