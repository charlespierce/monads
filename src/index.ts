import { Maybe } from './lib/maybe';

const something = Maybe.just(2);
const nothing = Maybe.nothing();
const double = (n: number) => n * 2;

console.log(something);
console.log(something.map(double));
console.log(nothing);
console.log(nothing.map(double));
